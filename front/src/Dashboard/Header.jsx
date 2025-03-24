import React, { useState } from "react";
import { Menu, Bell, User, Search, MessageSquare } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Low stock alert: Organic Fertilizer",
      time: "2 hours ago",
    },
    { id: 2, message: "New order received: #ORD-2458", time: "5 hours ago" },
    { id: 3, message: "Weather alert: Heavy rain forecast", time: "1 day ago" },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu size={20} />
          </button>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-green-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-gray-900">
            <MessageSquare size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border">
                <h3 className="px-4 py-2 font-medium text-gray-700 border-b">
                  Notifications
                </h3>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 border-b"
                  >
                    <p className="text-sm text-gray-800">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
                <div className="px-4 py-2">
                  <button className="text-sm text-green-600 hover:text-green-800">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Farm Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
