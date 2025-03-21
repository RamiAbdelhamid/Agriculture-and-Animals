// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//     } else {
//       // تخزين البيانات في localStorage
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         })
//       );

//       // هنا يمكن إضافة التعامل مع البيانات مثل إرسالها إلى الخادم (API) إذا لزم الأمر
//       alert("Account created successfully!");

//       // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول بعد التسجيل بنجاح
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="flex justify-center w-full my-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//           <p className="text-gray-600">Create an account to get started</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="confirm-password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirm-password"
//               name="confirmPassword"
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
//           >
//             Sign Up
//           </button>
//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-green-500 hover:underline">
//               Log In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Register = ({ switchForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }

    if (formData.password.length < 8) {
      setError("يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      await axios.post(
        "http://localhost:5000/api/users/register",
        dataToSend,
        { withCredentials: true } // أضف هذا
      );
      alert("تم التسجيل بنجاح!");
      switchForm();
    } catch (error) {
      setError(error.response?.data?.message || "فشل التسجيل");
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
      className="h-full flex flex-col"
    >
      <div className="mb-8 text-right">
        <h2 className="text-3xl font-bold text-[#383838]">إنشاء حساب جديد</h2>
        <p className="text-[#383838] mt-2">
          انضم إلينا اليوم واستفد من جميع المزايا
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
            htmlFor="name"
            className="block text-sm font-medium text-[#383838] mb-1"
          >
            الاسم الكامل
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name "
            className="w-full p-3 rounded-lg border border-[#383838] focus:ring-2 focus:ring-[#51a31d] focus:border-[#51a31d] transition-all text-right"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            dir="rtl"
          />
        </div>

        <div className="text-right">
          <label
            htmlFor="register-email"
            className="block text-sm font-medium text-[#383838] mb-1"
          >
            البريد الإلكتروني
          </label>
          <input
            id="register-email"
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
          <label
            htmlFor="register-password"
            className="block text-sm font-medium text-[#383838] mb-1"
          >
            كلمة المرور
          </label>
          <input
            id="register-password"
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

        <div className="text-right">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-[#383838] mb-1"
          >
            تأكيد كلمة المرور
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg border border-[#383838] focus:ring-2 focus:ring-[#51a31d] focus:border-[#51a31d] transition-all text-right"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            dir="rtl"
          />
          <p className="text-xs text-[#383838] mt-1">
            يجب أن تحتوي على 8 أحرف على الأقل
          </p>
        </div>

        <div className="flex items-start justify-end">
          <label htmlFor="terms" className="ml-2 block text-sm text-[#383838]">
            أوافق على{" "}
            <a href="#" className="text-[#51a31d] hover:text-[#383838]">
              الشروط والأحكام
            </a>{" "}
            و{" "}
            <a href="#" className="text-[#51a31d] hover:text-[#383838]">
              سياسة الخصوصية
            </a>
          </label>
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 mt-1 text-[#51a31d] border-[#383838] rounded focus:ring-[#51a31d]"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-[#51a31d] text-white py-3 rounded-lg font-medium shadow-md hover:bg-opacity-90 transition-colors"
          disabled={loading}
        >
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </motion.button>
      </form>

      <p className="text-center text-[#383838] mt-8">
        لديك حساب بالفعل؟{" "}
        <button
          onClick={switchForm}
          className="text-[#51a31d] font-medium hover:text-[#383838]"
        >
          تسجيل الدخول
        </button>
      </p>
    </motion.div>
  );
};

export default Register;
