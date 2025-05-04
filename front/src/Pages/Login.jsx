import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";
import { Tractor, Lock, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ switchForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/get-role",
        { withCredentials: true }
      );
      setUserRole(response.data.role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user role", error);
      setUserRole(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (rememberMe) {
        localStorage.setItem("email", formData.email);
      } else {
        localStorage.removeItem("email");
      }

      await axios.post("http://localhost:5000/api/users/login", formData, {
        withCredentials: true,
      });

      await fetchUserRole(); // انتظر تحديث الدور والحالة

      if (formData.email === "Admin@gmail.com") {
        navigate("/dashboard"); // توجيه للوحة الإدارة
      } else {
        navigate("/"); // توجيه للصفحة الرئيسية
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
    setIsAuthenticated(true);

    try {
      await axios.post(
        "http://localhost:5000/api/users/google-login",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      await fetchUserRole();
      navigate("/");

    } catch (error) {
      setError(
        error.response?.data?.message || "فشل تسجيل الدخول باستخدام جوجل"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Tractor className="w-12 h-12 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-green-800">
              Agricultural Hub
            </h2>
          </div>

          <p className="text-center text-gray-600 mb-6">
            Welcome to your agricultural management platform
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-green-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-green-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? "Logging in..." : "Sign In"}
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>

            <div className="mt-6">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError("Google login failed")}
                shape="pill"
                theme="outline"
                width="100%"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-600 hover:text-green-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
