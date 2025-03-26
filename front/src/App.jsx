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
import AddProduct from "../src/Dashboard/AddProduct";
import Dashboard from "../src/Dashboard/Dashboard";
import EditProduct from "../src/Dashboard/EditProduct";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainDash from "./Dashboard/MainDashboard";
import Shop from "./Pages/Shop";
import HealthGuide from "./Pages/HealthGuide";
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
          <Route path="/Dashboard/*" element={<MainDash />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/HealthGuide" element={<HealthGuide />} />
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
