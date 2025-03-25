import { Fragment, useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Navigation items configuration
const navigation = [
  { name: "Home", to: "/", icon: "🏡" },
  { name: "About", to: "/about", icon: "🌱" },
  { name: "Contact", to: "/contact", icon: "📞" },
  { name: "Veterinarians", to: "/veterinarians", icon: "🩺" },
  { name: "Farm Products", to: "/products", icon: "🚜" },
  { name: "Shop", to: "/Shop", icon: "🌱" },
];

export default function Navbar() {
  // State declarations
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  //***********************************************************************//
  // Scroll effect handler
  //***********************************************************************//
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //***********************************************************************//
  // Fetch user data function
  //***********************************************************************//
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/get-role",
        { withCredentials: true }
      );
      setUserRole(response.data.role);
      setIsAuthenticated(true);
      setIsLoggedIn(true);
    } catch (error) {
      setUserRole(null);
      setIsAuthenticated(false);
      setIsLoggedIn(false);
    }
  };

  //***********************************************************************//
  // Fetch user profile data
  //***********************************************************************//

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

  //***********************************************************************//
  // Initialize user data and active link
  //***********************************************************************//
  useEffect(() => {
    fetchUserData();
    setActiveLink(location.pathname);
  }, [location.pathname]);

  //***********************************************************************//
  // Logout handler
  //***********************************************************************//
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      setIsLoggedIn(false);
      setIsAuthenticated(false);
      setUserRole(null);
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <Disclosure
      as="nav"
      className={`transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-green-800 shadow-lg"
          : "bg-gradient-to-r from-green-600 to-green-700"
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center p-2 rounded-md text-green-100 hover:text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo and desktop navigation */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md transform hover:scale-110 transition-transform duration-200">
                      <span className="text-2xl">🌿</span>
                    </div>
                    <span className="font-bold text-white text-xl hidden md:block">
                      FarmFusion
                    </span>
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = location.pathname === item.to;
                      return (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={`
                            px-3 py-2 rounded-md text-base font-medium group relative overflow-hidden
                            ${
                              isCurrent
                                ? "bg-green-800 text-white"
                                : "text-green-100 hover:bg-green-800/60 hover:text-white"
                            }
                            transition-all duration-200 ease-in-out
                          `}
                        >
                          <span className="relative z-10 flex items-center space-x-1">
                            <span className="transform group-hover:scale-110 transition-transform duration-200">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </span>
                          {!isCurrent && (
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* User menu or auth buttons */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isLoggedIn ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="flex rounded-full bg-green-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700 transition-all duration-200 hover:ring-2 transform hover:scale-105">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-13 w-13 rounded-full border-2 border-white"
                          src={
                            user
                              ? `http://localhost:5000${user.profilePicture}`
                              : "/api/placeholder/40/40"
                          }
                          alt="User profile"
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/userprofile"
                              className={`${
                                active ? "bg-green-100" : ""
                              } block px-4 py-2 text-sm text-gray-700 transition-colors duration-200`}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={`${
                                active ? "bg-green-100" : ""
                              } block px-4 py-2 text-sm text-gray-700 transition-colors duration-200`}
                            >
                              Settings
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? "bg-green-100" : ""
                              } block w-full text-left px-4 py-2 text-sm text-gray-700 transition-colors duration-200`}
                            >
                              Sign out
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="relative overflow-hidden px-4 py-2 text-white bg-green-800 hover:bg-green-900 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                      <span className="relative z-10">Login</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                    <Link
                      to="/signup"
                      className="relative overflow-hidden px-4 py-2 text-green-800 bg-white hover:bg-green-50 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-50 to-white opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Transition
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="transform -translate-y-3 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-150 ease-in"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-3 opacity-0"
          >
            <DisclosurePanel className="sm:hidden bg-green-700 shadow-inner">
              <div className="space-y-1 px-3 pb-3 pt-2">
                {navigation.map((item) => {
                  const isCurrent = location.pathname === item.to;
                  return (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      to={item.to}
                      className={`
                        flex items-center space-x-3 rounded-md px-4 py-3 text-base font-medium
                        ${
                          isCurrent
                            ? "bg-green-800 text-white"
                            : "text-green-100 hover:bg-green-800/70 hover:text-white"
                        }
                        transition-all duration-200
                      `}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </DisclosureButton>
                  );
                })}
                {!isLoggedIn && (
                  <div className="mt-4 flex flex-col space-y-2 pt-3 border-t border-green-600">
                    <DisclosureButton
                      as={Link}
                      to="/login"
                      className="flex justify-center rounded-md bg-green-800 px-4 py-3 text-base font-medium text-white hover:bg-green-900 transition-colors duration-200"
                    >
                      Login
                    </DisclosureButton>
                    <DisclosureButton
                      as={Link}
                      to="/signup"
                      className="flex justify-center rounded-md bg-white px-4 py-3 text-base font-medium text-green-800 hover:bg-green-50 transition-colors duration-200"
                    >
                      Sign Up
                    </DisclosureButton>
                  </div>
                )}
              </div>
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
