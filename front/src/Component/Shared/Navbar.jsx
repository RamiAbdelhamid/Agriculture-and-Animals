import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "About", to: "/about", current: false },
  { name: "Contact", to: "/contact", current: false },
  { name: "Veterinarians", to: "/Veterinarians", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState("");

  // تحقق من وجود Token عند تحميل المكون
  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token); // جلب بيانات المستخدم بما في ذلك الصورة
    }
  }, []);

  // دالة لجلب بيانات المستخدم
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserProfilePicture(data.profilePicture); // افترض أن الخادم يعيد صورة المستخدم
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // دالة تسجيل الدخول
  const handleLogin = async () => {
    // هنا يمكنك إضافة منطق تسجيل الدخول (مثل إرسال بيانات المستخدم إلى الخادم)
    const token = "sampleToken123"; // هذا يجب أن يأتي من الخادم بعد تسجيل الدخول
    Cookies.set("authToken", token, { expires: 7 }); // تخزين الـ Token في Cookies
    setIsLoggedIn(true);
    fetchUserProfile(token); // جلب بيانات المستخدم بعد تسجيل الدخول
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    Cookies.remove("authToken"); // إزالة الـ Token من Cookies
    setIsLoggedIn(false);
    setUserProfilePicture("");
  };

  return (
    <Disclosure as="nav" className="bg-[#33a641]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* زر القائمة الجانبية للجوال */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md">
              <Bars3Icon className="block h-6 w-6" />
            </DisclosureButton>
          </div>

          {/* الشعار + روابط التنقل */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block ">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* أيقونة الإشعارات وقائمة المستخدم */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* قائمة المستخدم */}
            {isLoggedIn ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                    <img
                      src={userProfilePicture}
                      alt="User"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg ring-1 ring-black/5 rounded-md py-1">
                  {/* خيارات القائمة */}
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/Userprofile"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Settings
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className="flex space-x-4">
                {/* أزرار تسجيل الدخول والتسجيل إذا لم يكن المستخدم مسجل الدخول */}
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* قائمة الجوال الجانبية */}
      <DisclosurePanel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.to}
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
          {!isLoggedIn && (
            <>
              {/* أزرار تسجيل الدخول والتسجيل في قائمة الجوال */}
              <DisclosureButton
                as={Link}
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Login
              </DisclosureButton>
              <DisclosureButton
                as={Link}
                to="/signup"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign Up
              </DisclosureButton>
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}




// // --- Frontend: React Navbar Component ---
// import React, { useState, useEffect } from 'react';
// import { Menu, X, User } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
  
//   // Check authentication status on component mount
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   // Function to check if user is authenticated
//   const checkAuthStatus = async () => {
//     try {
//       const response = await fetch('/api/auth/verify', {
//         method: 'GET',
//         credentials: 'include', // Important for sending cookies
//       });
      
//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Authentication check failed:', error);
//       setIsLoggedIn(false);
//     }
//   };

//   // Handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // In a real app, you would redirect to login page or open login modal
//     window.location.href = '/login';
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/api/auth/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });
      
//       if (response.ok) {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   // Toggle mobile menu
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 font-bold text-xl">
//             PetCare
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden md:block">
//             <div className="flex items-center space-x-4">
//               <a href="/" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">Home</a>
//               <a href="/about" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">About</a>
//               <a href="/contact" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">Contact</a>
//               <a href="/veterinarians" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">Veterinarians</a>
              
//               {/* Conditional rendering based on auth state */}
//               {isLoggedIn ? (
//                 <>
//                   <a href="/profile" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex items-center">
//                     <User className="h-4 w-4 mr-1" />
//                     {user?.name || 'Profile'}
//                   </a>
//                   <button 
//                     onClick={handleLogout}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
//                   >
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button 
//                     onClick={handleLogin}
//                     className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium"
//                   >
//                     Login
//                   </button>
//                   <a href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
//                     Sign Up
//                   </a>
//                 </>
//               )}
//             </div>
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a href="/" className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">Home</a>
//             <a href="/about" className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">About</a>
//             <a href="/contact" className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">Contact</a>
//             <a href="/veterinarians" className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium">Veterinarians</a>
            
//             {/* Conditional rendering based on auth state */}
//             {isLoggedIn ? (
//               <>
//                 <a href="/profile" className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium flex items-center">
//                   <User className="h-4 w-4 mr-1" />
//                   {user?.name || 'Profile'}
//                 </a>
//                 <button 
//                   onClick={handleLogout}
//                   className="block w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md font-medium"
//                 >
//                   Sign Out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button 
//                   onClick={handleLogin}
//                   className="block w-full text-left text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md font-medium"
//                 >
//                   Login
//                 </button>
//                 <a href="/signup" className="block w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md font-medium">
//                   Sign Up
//                 </a>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// // --- Backend: Express/Node.js Authentication Routes ---
// // File: server.js or auth.routes.js

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');

// // Middleware for parsing cookies
// app.use(cookieParser());

// // Environment variables (store in .env file)
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.authToken;

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user (using your database model)
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     // Validate password
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

//     // Create token
//     const token = jwt.sign(
//       { id: user._id, name: user.name, email: user.email },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // Set token as HTTP-only cookie
//     res.cookie('authToken', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Use secure in production
//       maxAge: COOKIE_MAX_AGE,
//       sameSite: 'strict'
//     });

//     // Respond with success
//     res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Verify token route (used by Navbar)
// router.get('/verify', verifyToken, (req, res) => {
//   res.status(200).json({
//     id: req.user.id,
//     name: req.user.name,
//     email: req.user.email
//   });
// });

// // Logout route
// router.post('/logout', (req, res) => {
//   // Clear the auth cookie
//   res.clearCookie('authToken');
//   res.status(200).json({ message: 'Logged out successfully' });
// });

// module.exports = router;

// // In your main Express app file
// app.use('/api/auth', authRoutes);