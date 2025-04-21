
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const socialLinks = [
    { name: "Twitter", icon: "🐦", color: "bg-blue-400" },
    { name: "Facebook", icon: "👥", color: "bg-blue-600" },
    { name: "Instagram", icon: "📸", color: "bg-pink-500" },
    { name: "WhatsApp", icon: "💬", color: "bg-green-500" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
    { name: "About Us", path: "/about" },
  ];

  const usefulLinks = [
    { name: "Create Account", path: "/signup" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "FAQ", path: "/faq" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail("");
      // Here you would normally send this to your backend
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-green-400 via-yellow-300 to-green-400"></div>

      {/* Farm-themed decorative elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-8 opacity-20">
        <div className="w-full flex justify-around">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="text-xl animate-bounce"
              style={{
                animationDuration: `${1 + (i % 3)}s`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {["🌱", "🌿", "🍃", "🌾", "🌲"][i % 5]}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold">FarmFusion</h3>
            </div>

            <p className="text-green-100 mb-6 max-w-md">
              Growing together for a greener future. We provide top-quality
              agricultural products and veterinary services to help your farm
              and animals thrive.
            </p>

            {/* Newsletter subscription */}
            {/* <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">
                Join Our Newsletter
              </h4>
              {isSubscribed ? (
                <div className="bg-green-700 rounded-lg p-3 text-white animate-pulse">
                  Thank you for subscribing!
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-l-lg rounded-r-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-700 text-white placeholder-green-300 border border-green-600 flex-grow"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-green-800 font-bold rounded-lg sm:rounded-l-none px-4 py-2 transform hover:scale-105 transition-all duration-200 hover:bg-green-200"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li
                  key={link.name}
                  className="transform hover:translate-x-2 transition-transform duration-200"
                >
                  <Link
                    to={link.path}
                    className="text-green-200 hover:text-white flex items-center"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="mr-2">🌱</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2">
              {usefulLinks.map((link, index) => (
                <li
                  key={link.name}
                  className="transform hover:translate-x-2 transition-transform duration-200"
                >
                  <Link
                    to={link.path}
                    className="text-green-200 hover:text-white flex items-center"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="mr-2">🌿</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact and social section
        <div className="mt-12 border-t border-green-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-semibold mb-3">Connect With Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className={`
                      h-12 w-12 rounded-full flex items-center justify-center ${social.color} 
                      text-white shadow-lg transform hover:scale-110 transition-all duration-200
                      hover:rotate-6
                    `}
                    onMouseEnter={() => setHoveredIcon(social.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    aria-label={social.name}
                  >
                    <span className="text-2xl">{social.icon}</span>
                  </a>
                ))}
              </div>
              {hoveredIcon && (
                <p className="mt-2 text-sm text-green-300 animate-fadeIn">
                  Follow us on {hoveredIcon}
                </p>
              )}
            </div>

            <div className="text-green-300">
              <div className="flex space-x-2 items-center">
                <span className="text-xl">📍</span>
                <p>123 Farm Road, Greenville, AG 54321</p>
              </div>
              <div className="flex space-x-2 items-center mt-2">
                <span className="text-xl">📞</span>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-green-700 text-center">
          <p className="text-green-300">
            © {new Date().getFullYear()} FarmFusion Team. All rights reserved.
          </p>
  
        </div>
      </div>
    </footer>
  );
};

export default Footer;