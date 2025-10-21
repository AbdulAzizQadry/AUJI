import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormInput from "./FormInput";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendCode = async () => {
    setMessage("");
    setIsSuccess(null);
    try {
      const res = await fetch("http://localhost:5000/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();
      setMessage(data.message || "تم إرسال الكود");
      setIsSuccess(res.ok);
      setCodeSent(res.ok);
    } catch (err) {
      setMessage("حصل خطأ غير متوقع");
      setIsSuccess(false);
      setCodeSent(false);
    }
  };

  const verifyCode = async () => {
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code: verificationCode }),
      });

      const data = await res.json();
      setMessage(data.message || "تم التحقق من الكود");
      setIsSuccess(res.ok);
      if (res.ok) setIsVerified(true);
    } catch (err) {
      setMessage("حصل خطأ غير متوقع");
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("كلمة المرور غير متطابقة");
      setIsSuccess(false);
      return;
    }
    if (!isVerified) {
      setMessage("يجب التحقق من كود التفعيل أولا");
      setIsSuccess(false);
      return;
    }

    setMessage("");
    setIsSuccess(null);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || "تم التسجيل بنجاح");
      setIsSuccess(res.ok);

      if (res.ok) {
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err) {
      setMessage("حصل خطأ غير متوقع");
      setIsSuccess(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="w-80 p-6 border rounded-lg shadow-lg box-border bg-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل أكونت جديد</h2>

        <div className="space-y-3 bg-white">
          <FormInput
            type="text"
            name="username"
            label="اسم المستخدم"
            value={form.username}
            onChange={handleChange}
          />

          <FormInput
            type="email"
            name="email"
            label="البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
          />

          {!codeSent && (
            <button
              type="button"
              onClick={sendCode}
              className="w-full bg-gray-600 text-white p-2 rounded mb-4 hover:bg-gray-700 transition"
            >
              أرسل كود التفعيل
            </button>
          )}

          {codeSent && !isVerified && (
            <>
              <FormInput
                type="text"
                name="verificationCode"
                label="أدخل كود التفعيل"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                type="button"
                onClick={verifyCode}
                className="w-full bg-yellow-600 text-white p-2 rounded mb-4 hover:bg-yellow-700 transition"
              >
                تحقق من الكود
              </button>
            </>
          )}

          <FormInput
            type="password"
            name="password"
            label="كلمة المرور"
            value={form.password}
            onChange={handleChange}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {message && (
            <p className={`mb-3 text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            تسجيل
          </button>

          <p className="mt-4 text-center text-sm">
            عندك حساب بالفعل؟{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              سجل دخول
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
