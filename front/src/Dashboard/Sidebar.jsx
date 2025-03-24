// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   Package,
//   PlusCircle,
//   List,
//   Layers,
//   BarChart2,
//   ShoppingBag,
//   Settings,
//   ChevronRight,
//   Tractor,
//   Leaf,
//   Droplet,
// } from "lucide-react";

// const Sidebar = ({ isOpen }) => {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", icon: <Home size={20} />, path: "/" },
//     { name: "Products", icon: <Package size={20} />, path: "/EditProductList" },
//     {
//       name: "Add Product",
//       icon: <PlusCircle size={20} />,
//       path: "/add-product",
//     },
//     {
//       name: "Add Veterinarian",
//       icon: <PlusCircle size={20} />,
//       path: "/VetAdmin",
//     },
//     { name: "Categories", icon: <List size={20} />, path: "/categories" },
//     { name: "Veterinarians", icon: <Layers size={20} />, path: "/vet" },
//     {
//       name: "DoctorReservations",
//       icon: <ShoppingBag size={20} />,
//       path: "/DoctorReservations",
//     },
//     { name: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
//     { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
//   ];

//   return (
//     <div
//       className={`${
//         isOpen ? "w-64" : "w-20"
//       } bg-green-800 text-white transition-all duration-300 ease-in-out`}
//     >
//       <div className="p-4 flex items-center justify-center">
//         {isOpen ? (
//           <div className="flex items-center space-x-2">
//             <Leaf size={24} className="text-white" />
//             <h1 className="text-xl font-bold">AgroAdmin</h1>
//           </div>
//         ) : (
//           <Leaf size={24} className="text-white" />
//         )}
//       </div>

//       <div className="mt-6">
//         {menuItems.map((item) => (
//           <Link
//             key={item.name}
//             to={item.path}
//             className={`flex items-center py-3 px-4 ${
//               location.pathname === item.path
//                 ? "bg-green-700"
//                 : "hover:bg-green-700"
//             } transition-colors duration-200`}
//           >
//             <span className="mr-4">{item.icon}</span>
//             {isOpen && <span>{item.name}</span>}
//           </Link>
//         ))}
//       </div>

//       <div className="mt-6 border-t border-green-700 pt-4 px-4">
//         <div className="bg-green-700 rounded-lg p-4 mb-4">
//           <div className="flex items-center space-x-2">
//             <Tractor size={20} />
//             {isOpen && <h3 className="font-medium">Farming Tools</h3>}
//           </div>
//           {isOpen && (
//             <div className="mt-2 text-sm">
//               <p>Quick access to farming resources</p>
//               <button className="mt-2 flex items-center text-green-300 hover:text-white">
//                 Explore <ChevronRight size={16} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  PlusCircle,
  List,
  Layers,
  BarChart2,
  ShoppingBag,
  Settings,
  ChevronRight,
  Tractor,
  Leaf,
  Droplet,
} from "lucide-react";


const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/Dashboard" },
    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/Dashboard/products",
    },
    {
      name: "Add Product",
      icon: <PlusCircle size={20} />,
      path: "/Dashboard/add-product",
    },
    {
      name: "Add Veterinarian",
      icon: <PlusCircle size={20} />,
      path: "/Dashboard/VetAdmin",
    },
    {
      name: "Categories",
      icon: <List size={20} />,
      path: "/Dashboard/categories",
    },
    {
      name: "Veterinarians",
      icon: <Layers size={20} />,
      path: "/Dashboard/vet",
    },
    {
      name: "DoctorReservations",
      icon: <Layers size={20} />,
      path: "/Dashboard/DoctorReservations",
    },
    {
      name: "Analytics",
      icon: <BarChart2 size={20} />,
      path: "/Dashboard/analytics",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/Dashboard/settings",
    },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-green-800 text-white transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 flex items-center justify-center">
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <Leaf size={24} className="text-white" />
            <h1 className="text-xl font-bold">AgroAdmin</h1>
          </div>
        ) : (
          <Leaf size={24} className="text-white" />
        )}
      </div>

      <div className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center py-3 px-4 ${
              location.pathname === item.path
                ? "bg-green-700"
                : "hover:bg-green-700"
            } transition-colors duration-200`}
          >
            <span className="mr-4">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="mt-6 border-t border-green-700 pt-4 px-4">
        <div className="bg-green-700 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <Tractor size={20} />
            {isOpen && <h3 className="font-medium">Farming Tools</h3>}
          </div>
          {isOpen && (
            <div className="mt-2 text-sm">
              <p>Quick access to farming resources</p>
              <button className="mt-2 flex items-center text-green-300 hover:text-white">
                Explore <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
