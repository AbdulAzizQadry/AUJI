import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import FormInput from "./FormInput";
import axios from "axios";

const Login = () => {
  const [isSuccess, setIsSuccess] = useState(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
    };
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setIsSuccess(null);

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      setMessage("تم تسجيل الدخول بنجاح");
      setIsSuccess(true);
      setTimeout(() => {
        login(res.data.token);
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "حصل خطأ غير متوقع";
      setMessage(errorMsg);
      setIsSuccess(false);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
      <form
        autoComplete="off"
        onSubmit={handleLogin}
        className="w-80 p-6 border rounded-lg shadow-lg box-border bg-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
        <div className="space-y-3 bg-white">
          <FormInput
            type="email"
            name="email"
            label="البريد الالكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            label="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {message && (
            <p
              className={`mb-3 text-sm ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            دخول
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          معندكش حساب؟{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            سجل دلوقتي
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
