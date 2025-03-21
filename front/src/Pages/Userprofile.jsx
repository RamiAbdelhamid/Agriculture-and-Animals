import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Tractor,
  Camera,
  Wheat,
  Edit2,
  Save,
} from "lucide-react";

const Userprofile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
   
  });

  // Fetch data from localStorage when component mounts
useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setProfileData((prevState) => ({
      ...prevState,
      name: parsedUser.name,
      email: parsedUser.email,
    }));
  } else {
    console.log("User data not found in localStorage");
  }
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-green-600" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                  <Camera className="w-5 h-5 text-green-600" />
                </button>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-white">
                {profileData.name || "Loading..."}
              </h1>
              <p className="text-green-100">{profileData.farmName}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Personal Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              {/* Other fields */}
            </div>

            {/* Farm Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Tractor className="w-5 h-5 text-green-600" />
                Farm Information
              </h2>

              {/* Farm info fields */}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save Profile
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Userprofile;
