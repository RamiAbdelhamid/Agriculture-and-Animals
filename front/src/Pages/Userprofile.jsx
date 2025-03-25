import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setUpdatedUser({
          name: res.data.user.name,
          email: res.data.user.email,
          profilePicture: res.data.user.profilePicture,
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "فشل في جلب بيانات المستخدم"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setUpdatedUser((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    if (updatedUser.profilePicture) {
      formData.append("profilePicture", updatedUser.profilePicture);
    }
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser(res.data.user);
      setIsEditing(false);
      toast.success("تم تحديث المعلومات بنجاح");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في تحديث المعلومات");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/auth";
    } catch (error) {
      toast.error("فشل في تسجيل الخروج");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-[#383838]">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#51a31d]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          جاري التحميل...
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#f9f9fb] min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#51a31d] px-6 py-8">
            <div className="flex flex-col md:flex-row items-center">
              {user.profilePicture ? (
                <img
                  src={`http://localhost:5000${user.profilePicture}`}
                  alt="الصورة الشخصية"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300 flex items-center justify-center border-4 border-white shadow-md">
                  <span className="text-4xl text-[#383838]">
                    {user.name?.charAt(0).toUpperCase() || "؟"}
                  </span>
                </div>
              )}
              <div className="mt-4 md:mt-0 md:mr-6 text-center md:text-right flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {user.name}
                </h1>
                <p className="text-[#f9f9fb]">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-[#383838] text-white rounded-full text-sm">
                  {user.role}
                </span>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleLogout}
                  className="bg-[#383838] hover:bg-[#51a31d] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="p-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#383838]">
                  المعلومات الشخصية
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-[#51a31d] hover:bg-[#383838] text-white px-4 py-1 rounded-lg transition-colors text-sm"
                >
                  {isEditing ? "إلغاء" : "تعديل المعلومات"}
                </button>
              </div>
              {isEditing ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  encType="multipart/form-data"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#f9f9fb] p-4 rounded-lg shadow-sm">
                      <label className="text-sm text-[#383838] block mb-1">
                        الاسم
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={updatedUser.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#51a31d] rounded-md bg-[#f9f9fb] focus:outline-none focus:border-[#383838]"
                        required
                      />
                    </div>
                    <div className="bg-[#f9f9fb] p-4 rounded-lg shadow-sm">
                      <label className="text-sm text-[#383838] block mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#51a31d] rounded-md bg-[#f9f9fb] focus:outline-none focus:border-[#383838]"
                        required
                      />
                    </div>
                    <div className="bg-[#f9f9fb] p-4 rounded-lg shadow-sm md:col-span-2">
                      <label className="text-sm text-[#383838] block mb-1">
                        الصورة الشخصية
                      </label>
                      <input
                        type="file"
                        name="profilePicture"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-[#51a31d] rounded-md bg-[#f9f9fb] focus:outline-none focus:border-[#383838]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#51a31d] hover:bg-[#383838] text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      حفظ التغييرات
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f9f9fb] p-4 rounded-lg shadow-sm">
                    <label className="text-sm text-[#383838]">الاسم</label>
                    <p className="font-medium text-[#383838]">{user.name}</p>
                  </div>
                  <div className="bg-[#f9f9fb] p-4 rounded-lg shadow-sm">
                    <label className="text-sm text-[#383838]">
                      البريد الإلكتروني
                    </label>
                    <p className="font-medium text-[#383838]">{user.email}</p>
                  </div>
                  <div className="bg-[#f9f9fb] p-4 rounded-lg shadow-sm">
                    <label className="text-sm text-[#383838]">الدور</label>
                    <p className="font-medium text-[#383838]">{user.role}</p>
                  </div>
                  <div className="bg-[#f9f9fb] p-4 rounded-lg shadow-sm">
                    <label className="text-sm text-[#383838]">
                      تاريخ الإنشاء
                    </label>
                    <p className="font-medium text-[#383838]">
                      {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
