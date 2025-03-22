import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Shared/Navbar";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Footer from "./Component/Shared/Footer";
import Login from "./Pages/Login";
import Userprofile from "./Pages/Userprofile";
import Veterinarians from "./Pages/Veterinarians";
import Livevacc from "./Pages/Livevacc";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import SignUp from "./Pages/SignUp";
import ProceedToPayment from "./Pages/ProceedToPayment";
import AddProduct from "../Dashboard/AddProduct";
import Dashboard from "../Dashboard/Dashboard";
import EditProduct from "../Dashboard/EditProduct";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <GoogleOAuthProvider clientId="708338751810-vs4526i07didjadt2vhqgrgu1vnr3ib8.apps.googleusercontent.com">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Userprofile" element={<Userprofile />} />
          <Route path="/Veterinarians" element={<Veterinarians />} />
          <Route path="/Livevacc" element={<Livevacc />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/proceed-to-payment" element={<ProceedToPayment />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import AddProduct from '../Dashboard/AddProduct';
// import EditProduct from "../Dashboard/EditProduct";
// import EditProductList from "../Dashboard/EditProductList";
// import Dashboard from "../Dashboard/Dashboard";
// import Sidebar from "../Dashboard/Sidebar";
// import Header from "../Dashboard/Header";
// import CategoryManagement from "../Dashboard/CategoryManagement";
// import InventoryTracking from "../Dashboard/InventoryTracking";
// import OrderManagement from "../Dashboard/OrderManagement";
// import Analytics from "../Dashboard/Analytics";
// import Settings from '../Dashboard/Settings';
// import VetDashboard from "../Dashboard/VetDashboard";
// import DoctorReservations from "../Dashboard/DoctorReservations";
// import VetAdmin from "../Dashboard/VetAdmin";

// const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar isOpen={sidebarOpen} />

//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/add-product" element={<AddProduct />} />
//               <Route path="/edit-product/:id" element={<EditProduct />} />
//               <Route path="/categories" element={<CategoryManagement />} />
//               <Route path="/inventory" element={<InventoryTracking />} />
//               <Route path="/orders" element={<OrderManagement />} />
//               <Route path="/analytics" element={<Analytics />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/EditProductList" element={<EditProductList />} />
//               <Route path="/VetAdmin" element={<VetAdmin />} />
//               <Route path="/vet" element={<VetDashboard />} />
//               <Route
//                 path="/DoctorReservations"
//                 element={<DoctorReservations />}
//               />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
