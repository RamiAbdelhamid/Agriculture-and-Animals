// import React, { useState, useEffect } from "react";
// import { User, Mail, Lock, Tractor, Wheat } from "lucide-react"; // Importing necessary icons

// //*****************************************************************//

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     farmName: "",
//   });

//   //*****************************************************************//

//   // Check localStorage for user data on initial render
//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData) {
//       setFormData(userData);
//       setIsLogin(true); // Automatically set to login if user data exists
//     }
//   }, []); // Runs only once on component mount

//   //*****************************************************************//

//   // Handle form submission (Login or Signup)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       const storedData = JSON.parse(localStorage.getItem("user"));
//       // Check if credentials are valid for login
//       if (
//         storedData &&
//         storedData.email === formData.email &&
//         storedData.password === formData.password
//       ) {
//         localStorage.setItem("isLoggedIn", "true"); // Update login state
//         window.location.reload(); // Reload the page to refresh the UI
//       } else {
//         alert("Invalid credentials!"); // Show error for invalid credentials
//       }
//     } else {
//       // Handle signup and store user data
//       if (formData.password !== formData.confirmPassword) {
//         alert("Passwords do not match"); // Show error if passwords do not match
//       } else {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             password: formData.password,
//             farmName: formData.farmName,
//           })
//         );
//         alert("Account created successfully!"); // Show success message
//       }
//     }
//   };

//   //*****************************************************************//

//   // Handle input changes in the form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   //*****************************************************************//

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
//       <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="p-8">
//           {/* Logo and Header Section */}
//           <div className="text-center mb-8">
//             <div className="flex justify-center gap-2 mb-4">
//               <Tractor className="h-8 w-8 text-green-600" />
//               <Wheat className="h-8 w-8 text-amber-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               {isLogin ? "Welcome Back" : "Join AgriFarm"}
//             </h2>
//             <p className="text-gray-600 mt-2">
//               {isLogin
//                 ? "Access your agricultural management tools"
//                 : "Start managing your farm operations today"}
//             </p>
//           </div>

//           {/* Form Section */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Conditionally render the Name field for Signup */}
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="John Farmer"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Email field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="farmer@example.com"
//                 />
//               </div>
//             </div>

//             {/* Password field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="password"
//                   name="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             {/* Conditionally render the Farm Name field for Signup */}
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Farm Name
//                 </label>
//                 <div className="relative">
//                   <Tractor className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                   <input
//                     type="text"
//                     name="farmName"
//                     required
//                     value={formData.farmName}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="Green Valley Farm"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Render remember me checkbox and forgot password link for Login */}
//             {isLogin && (
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="remember"
//                     className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="remember"
//                     className="ml-2 block text-sm text-gray-700"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//                 <div className="text-sm">
//                   <a
//                     href="#"
//                     className="font-medium text-green-600 hover:text-green-500"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
//             )}

//             {/* Submit button */}
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
//             >
//               {isLogin ? "Sign In" : "Create Account"}
//             </button>
//           </form>

//           {/* Toggle between login and signup */}
//           <div className="mt-6 text-center text-sm">
//             <span className="text-gray-600">
//               {isLogin
//                 ? "Don't have an account? "
//                 : "Already have an account? "}
//             </span>
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-green-600 font-medium hover:text-green-500"
//             >
//               {isLogin ? "Sign up" : "Sign in"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// //*****************************************************************//

// export default Login;


import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";

const Login = ({ switchForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
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
