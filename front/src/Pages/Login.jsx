import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";
import { Tractor, Wheat, Users, Lock, Mail } from "lucide-react";

const Login = ({ switchForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState(null);


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














  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData({ ...formData, email: savedEmail });
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
      fetchUserRole();

      console.log(userRole);
      if (formData.email === "Admin@gmail.com") {
        window.location.href = "/dashboard"; // Redirect after login
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
      window.location.href = "/dashboard";
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
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
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
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
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
                    setFormData({ ...formData, password: e.target.value })
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

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? "Logging in..." : "Sign In"}
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
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
              <a href="signup" className="text-green-600 hover:text-green-700">
                <button
                  onClick={switchForm}
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Sign up
                </button>
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
