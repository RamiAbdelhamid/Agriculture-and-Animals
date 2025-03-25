import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";

const Login = ({ switchForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // استرجاع البريد الإلكتروني إذا كان "تذكرني" مفعلًا من localStorage
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData({ ...formData, email: savedEmail });
      setRememberMe(true);
    }
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/get-role",
        { withCredentials: true }
      );
      console.log(response.data.role);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("error fetching user role");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // إذا كان تذكرني مفعلًا، قم بتخزين البريد الإلكتروني في localStorage
      if (rememberMe) {
        localStorage.setItem("email", formData.email);
      } else {
        localStorage.removeItem("email"); // إزالة البريد الإلكتروني إذا تم إلغاء التفعيل
      }

      await axios.post("http://localhost:5000/api/users/login", formData, {
        withCredentials: true, // 🔥 Ensures cookies are stored
      });

      fetchUserRole();

      console.log(userRole);
      if (formData.email === "Admin@gmail.com") {
        window.location.href = "/admin-dashboard"; // Redirect after login
      } else {
        window.location.href = "/"; // Redirect after login
      }
    } catch (error) {
      setError(error.response?.data?.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/google-login",
        {
          token: credentialResponse.credential,
        }
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error) {
      setError(
        error.response?.data?.message || "فشل تسجيل الدخول باستخدام جوجل"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-[#f9f9fb]"
    >
      <div className="mb-8 text-right">
        <h2 className="text-3xl font-bold text-[#383838]">تسجيل الدخول</h2>
        <p className="text-[#383838] mt-2">
          مرحباً بعودتك! يرجى تسجيل الدخول للوصول إلى حسابك
        </p>
      </div>

      {error && (
        <div className="bg-[#f9f9fb] text-[#383838] p-3 rounded-lg mb-6 text-right">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
        <div className="text-right">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#383838] mb-1"
          >
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full p-3 rounded-lg border border-[#383838] focus:ring-2 focus:ring-[#51a31d] focus:border-[#51a31d] transition-all text-right"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            required
            dir="rtl"
          />
        </div>

        <div className="text-right">
          <div className="flex justify-between items-center mb-1">
            <a href="#" className="text-sm text-[#51a31d] hover:text-[#383838]">
              نسيت كلمة المرور؟
            </a>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#383838]"
            >
              كلمة المرور
            </label>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg border border-[#383838] focus:ring-2 focus:ring-[#51a31d] focus:border-[#51a31d] transition-all text-right"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            dir="rtl"
          />
        </div>

        <div className="flex items-center justify-end">
          <label
            htmlFor="remember-me"
            className="mr-2 block text-sm text-[#383838]"
          >
            تذكرني
          </label>
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#51a31d] border-[#383838] rounded focus:ring-[#51a31d]"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-[#51a31d] text-white py-3 rounded-lg font-medium shadow-md hover:bg-opacity-90 transition-colors"
          disabled={loading}
        >
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </motion.button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#383838]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#f9f9fb] text-[#383838] text-sm">
              أو الاستمرار باستخدام
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("فشل تسجيل الدخول باستخدام جوجل")}
            shape="pill"
            theme="outline"
            width="100%"
            disabled={loading}
          />
        </div>
      </form>

      <p className="text-center text-[#383838] mt-8">
        ليس لديك حساب؟{" "}
        <button
          onClick={switchForm}
          className="text-[#51a31d] font-medium hover:text-[#383838]"
        >
          إنشاء حساب
        </button>
      </p>
    </motion.div>
  );
};

export default Login;
