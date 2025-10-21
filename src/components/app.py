from werkzeug.security import generate_password_hash, check_password_hash
from sib_api_v3_sdk.rest import ApiException
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from functools import wraps

import sqlite3, random, re
import sib_api_v3_sdk
import jwt, datetime
import requests
import time
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

verification_codes = {}

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = os.getenv("BREVO_API_KEY")

app.config["SECRET_KEY"] = "a3f9b8c12d7e4f5a9b3d6e7c8f1a2b3c"

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {".pdf"}

def init_db():
    with sqlite3.connect("auji.db") as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                cv_path TEXT
            )
        """)
        conn.commit()

def verify_email(email):
    API_KEY = os.getenv("ABSTRACT_API_KEY")
    url = f"https://emailvalidation.abstractapi.com/v1/?api_key={API_KEY}&email={email}"
    response = requests.get(url)
    return response.json()

def send_verification_email(email, code):
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": email}],
        sender={"email": "sezaroo2004@hotmail.com", "name": "AUJI"},
        subject="كود التفعيل الخاص بك",
        html_content=f"<p>كود التفعيل هو: <b>{code}</b></p>"
    )
    try:
        api_instance.send_transac_email(send_smtp_email)
        return True
    except ApiException as e:
        return False

def is_valid_password(password):
    if len(password) < 8:
        return False, "كلمة المرور يجب أن تكون 8 خانات على الأقل"

    if not re.search(r"[A-Z]", password):
        return False, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل"

    if not re.search(r"[a-z]", password):
        return False, "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل"

    if not re.search(r"\d", password):
        return False, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل"
    return True, ""

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify({"message": "مفيش توكن"}), 401

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            user_id = data["user_id"]
        except Exception as e:
            return jsonify({"message": "توكن غير صالح"}), 401

        return f(user_id, *args, **kwargs)
    return decorated

def get_user(email):
    conn = sqlite3.connect("auji.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email=?", (email,))
    return cursor.fetchone()

init_db()

@app.route("/upload-cv", methods=["POST"])
@token_required
def upload_cv(user_id):
    if "cv" not in request.files:
        return jsonify({"message": "مفيش ملف مرفوع"}), 400
    
    file = request.files["cv"]

    if file.filename == "":
        return jsonify({"message": "اختار ملف"}), 400
    
    ext = os.path.splitext(file.filename)[1]
    if ext not in ALLOWED_EXTENSIONS:
        return jsonify({"success": False, "message": "مسموح بس بملفات PDF"}), 400
    timestamp = int(time.time())
    filename = f"user_{user_id}_{timestamp}{ext}"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    with sqlite3.connect("auji.db") as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET cv_path = ? WHERE id = ?", (filepath, user_id))
        conn.commit()

    return jsonify({"success": True, "message": "تم رفع السيرة الذاتية بنجاح"}), 200

@app.route("/send-code", methods=["POST"])
def send_code():
    data = request.get_json()
    email = data.get("email")

    verification = verify_email(email)
    if not verification.get("is_mx_found", {}).get("value", False):
        return jsonify({"message": "الايميل غير موجود"}), 400
    if not verification.get("is_smtp_valid", {}).get("value", False):
        return jsonify({"message": "الايميل لا يستقبل رسائل"}), 400

    code = random.randint(100000, 999999)
    verification_codes[email] = code

    if send_verification_email(email, code):
        return jsonify({"message": "تم إرسال كود التفعيل على بريدك الإلكتروني"}), 200
    else:
        return jsonify({"message": "فشل في إرسال الكود"}), 500

@app.route("/verify-code", methods=["POST"])
def verify_code():
    data = request.get_json()
    email = data.get("email")
    code = int(data.get("code"))

    if verification_codes.get(email) == code:
        verification_codes.pop(email)
        return jsonify({"message": "تم التحقق بنجاح"}), 200
    else:
        return jsonify({"message": "كود التفعيل غير صحيح"}), 400

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "كل الحقول مطلوبة"}), 400

    if email in verification_codes:
        return jsonify({"message": "يجب التحقق من كود التفعيل أولًا"}), 400    

    valid, message = is_valid_password(password)
    if not valid:
        return jsonify({"message": message}), 400

    hashed_password = generate_password_hash(password)

    try:
        with sqlite3.connect("auji.db") as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                (username, email, hashed_password)
            )
            conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({"message": "البريد الإلكتروني مسجّل بالفعل"}), 400
    return jsonify({"message": "تم تسجيل الحساب بنجاح!"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = get_user(email)
    if not user:
        return jsonify({"message": "الايميل مش موجود"}), 401
    
    user_id = user[0]
    db_password = user[3]
    
    if not check_password_hash(db_password, password):
        return jsonify({"message": "الباسورد غلط"}), 401
    
    token = jwt.encode({
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, app.config["SECRET_KEY"], algorithm="HS256")
    
    return jsonify({"token": token})

if __name__ == "__main__":
    app.run(debug=True)
