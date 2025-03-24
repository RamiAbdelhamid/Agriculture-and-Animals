import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import EditProductList from "./EditProductList";
import AddProduct from "./AddProduct";
import CategoryManagement from "./CategoryManagement";
import Analytics from "./Analytics";
import { Settings } from "./Settings";
import VetDashboard from './VetDashboard';
import EditProduct from "./EditProduct";
import InventoryTracking from "./InventoryTracking";
import OrderManagement from "./OrderManagement";
import VetAdmin from "./VetAdmin";
import DoctorReservations from "./DoctorReservations";

const MainDash = () => {
  return (
    <div className="flex">
      <Sidebar isOpen={true} />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<EditProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/categories" element={<CategoryManagement />} />
          {/* <Route path="/vet" element={<VetDashboard />} /> */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more nested routes as needed */}
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/inventory" element={<InventoryTracking />} />
          <Route path="/orders" element={<OrderManagement />} />

          <Route path="/VetAdmin" element={<VetAdmin />} />
          <Route path="/vet" element={<VetDashboard />} />
            <Route path="/DoctorReservations" element={<DoctorReservations />} />


        </Routes>
      </div>
    </div>
  );
};

export default MainDash;
