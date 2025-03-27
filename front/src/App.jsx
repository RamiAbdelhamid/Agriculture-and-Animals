// import React from "react";
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Component/Shared/Navbar";
// import Home from "./Pages/Home";
// import AboutUs from "./Pages/AboutUs";
// import ContactUs from "./Pages/ContactUs";
// import Footer from "./Component/Shared/Footer";
// import Login from "./Pages/Login";
// import Userprofile from "./Pages/Userprofile";
// import Veterinarians from "./Pages/Veterinarians";
// import Livevacc from "./Pages/Livevacc";
// import ProductDetails from "./Pages/ProductDetails";
// import Checkout from "./Pages/Checkout";
// import SignUp from "./Pages/SignUp";
// import ProceedToPayment from "./Pages/ProceedToPayment";
// import AddProduct from "../src/Dashboard/AddProduct";
// import Dashboard from "../src/Dashboard/Dashboard";
// import EditProduct from "../src/Dashboard/EditProduct";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import MainDash from "./Dashboard/MainDashboard";
// import Shop from "./Pages/Shop";
// import HealthGuide from "./Pages/HealthGuide";
// import Wishlist from "./Pages/Wishlist";
// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   return (
//     <GoogleOAuthProvider clientId="708338751810-vs4526i07didjadt2vhqgrgu1vnr3ib8.apps.googleusercontent.com">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Userprofile" element={<Userprofile />} />
//           <Route path="/Veterinarians" element={<Veterinarians />} />
//           <Route path="/Livevacc" element={<Livevacc />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/SignUp" element={<SignUp />} />
//           <Route path="/proceed-to-payment" element={<ProceedToPayment />} />
//           <Route path="/add-product" element={<AddProduct />} />
//           <Route path="/Dashboard/*" element={<MainDash />} />
//           <Route path="/edit-product/:id" element={<EditProduct />} />
//           <Route path="/Shop" element={<Shop />} />
//           <Route path="/HealthGuide" element={<HealthGuide />} />
//           <Route path="/Wishlist" element={<Wishlist />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import AddProduct from "../src/Dashboard/AddProduct";
import Dashboard from "../src/Dashboard/Dashboard";
import EditProduct from "../src/Dashboard/EditProduct";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainDash from "./Dashboard/MainDashboard";
import Shop from "./Pages/Shop";
import HealthGuide from "./Pages/HealthGuide";
import Wishlist from "./Pages/Wishlist";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation(); // الآن داخل Router

  // تحديد المسارات التي لا يجب أن يظهر فيها الـNavbar والـFooter
  const noNavbarFooterRoutes = [
    "/login",
    "/signup",
    "/Dashboard/add-product",
    "/edit-product",
    "/Dashboard",
    "/dashboard",

  ];

  // تحديد إذا كان يجب إخفاء الـNavbar والـFooter بناءً على المسار
  const showNavbarFooter = !noNavbarFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {showNavbarFooter && <Navbar />}{" "}
      {/* عرض الـNavbar فقط في المسارات غير المذكورة */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/veterinarians" element={<Veterinarians />} />
        <Route path="/livevacc" element={<Livevacc />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/proceed-to-payment" element={<ProceedToPayment />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/Dashboard/*" element={<MainDash />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/healthguide" element={<HealthGuide />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      {showNavbarFooter && <Footer />}{" "}
      {/* عرض الـFooter فقط في المسارات غير المذكورة */}
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="708338751810-vs4526i07didjadt2vhqgrgu1vnr3ib8.apps.googleusercontent.com">
      <Router>
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
