import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import CategoryCollection from "./pages/CategoryCollection";
import ProductDetails from "./pages/ProductDetails";
import Testimonial from "./pages/Testimonial";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrder from "./pages/MyOrder";
import Wishlist from "./pages/Wishlish";
import PaymentSuccess from "./pages/PaymentSuccess";  // ✅ THÊM IMPORT
import PaymentCancel from "./pages/PaymentCancel";    // ✅ THÊM IMPORT

// Admin imports
import Sidebar from "./components/admin/Sidebar";
import AdminLogin from "./components/admin/AdminLogin";
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import Orders from "./pages/admin/Order";
import EditProduct from "./pages/admin/EditProduct";
import OrderDetail from "./pages/admin/OrderDetail";

import useScrollToTop from "./hooks/useScrollToTop";

import { ShopContext } from "./context/ShopContext";
import { Toaster } from "react-hot-toast";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

// ICONS
import { SiZalo } from "react-icons/si";
import { FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";
import { IoChatbubbleEllipses, IoClose } from "react-icons/io5";

const App = () => {

useScrollToTop();

const { showUserLogin, isAdmin, setIsAdmin, user } = useContext(ShopContext);
const location = useLocation();

const [showContact, setShowContact] = useState(false);

useEffect(() => {
const adminToken = localStorage.getItem("adminToken");
if (adminToken && !isAdmin) {
setIsAdmin(true);
}
}, [isAdmin, setIsAdmin]);

const isAdminRoute = location.pathname.startsWith("/admin");

const ProtectedUserRoute = ({ children }) => {
if (!user) {
return <Navigate to="/" state={{ from: location.pathname }} replace />;
}
return children;
};

const AdminRoute = ({ children }) => {
if (!isAdmin) {
return <Navigate to="/admin/login" replace />;
}
return children;
};

return ( <div className="bg-primary min-h-screen flex flex-col">

  {showUserLogin && <Login />}

  {!isAdminRoute && <Header />}

  <main className={`text-tertiary flex-grow ${isAdminRoute ? "p-0" : ""}`}>

    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />

    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/collection/:category" element={<Collection />} />
      <Route path="/collection/:category/:id" element={<ProductDetails />} />
      <Route path="/testimonial" element={<Testimonial />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/payment-success" element={<PaymentSuccess />} /> {/* ✅ THÊM */}
      <Route path="/payment-cancel" element={<PaymentCancel />} />   {/* ✅ THÊM */}

      {/* USER ROUTES */}
      <Route path="/cart" element={
        <ProtectedUserRoute>
          <Cart />
        </ProtectedUserRoute>
      } />

      <Route path="/place-order" element={
        <ProtectedUserRoute>
          <PlaceOrder />
        </ProtectedUserRoute>
      } />

      <Route path="/my-orders" element={
        <ProtectedUserRoute>
          <MyOrder />
        </ProtectedUserRoute>
      } />

      <Route path="/wishlist" element={
        <ProtectedUserRoute>
          <Wishlist />
        </ProtectedUserRoute>
      } />

      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminRoute><Sidebar /></AdminRoute>}>
        <Route index element={<AddProduct />} />
        <Route path="list" element={<ProductList />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* 404 - ĐỂ CUỐI CÙNG */}
      <Route path="*" element={
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>
      } />

    </Routes>

  </main>

  {/* CONTACT FLOAT PRO */}
  {!isAdminRoute && (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">

      <div
        className={`flex flex-col gap-4 transition-all duration-300 ${
          showContact
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >

        {/* ZALO */}
        <a
          href="https://zalo.me/0988439116"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-4 bg-white shadow-xl px-6 py-3 rounded-full transition-all duration-300 hover:bg-blue-500 hover:text-white"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500 transition">
            <SiZalo size={20} />
          </div>
          <span className="font-semibold tracking-wide">CHAT ZALO</span>
        </a>

        {/* MESSENGER */}
        <a
          href="https://m.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-4 bg-white shadow-xl px-6 py-3 rounded-full transition-all duration-300 hover:bg-purple-500 hover:text-white"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 text-white group-hover:bg-white group-hover:text-purple-500 transition">
            <FaFacebookMessenger size={18} />
          </div>
          <span className="font-semibold tracking-wide">MESSENGER</span>
        </a>

        {/* PHONE */}
        <a
          href="tel:0988439116"
          className="group relative flex items-center gap-4 bg-white shadow-xl px-6 py-3 rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white group-hover:bg-white group-hover:text-red-500 transition">
            <FaPhoneAlt size={16} />
          </div>
          <span className="font-semibold tracking-wide">
            0123456789
          </span>
        </a>

      </div>

      <button
        onClick={() => setShowContact(!showContact)}
        className="relative w-14 h-14 flex items-center justify-center rounded-full bg-black text-white shadow-xl hover:bg-red-500 transition-all duration-300 hover:scale-110"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-30 animate-ping"></span>

        {showContact ? (
          <IoClose size={26} />
        ) : (
          <IoChatbubbleEllipses size={24} />
        )}
      </button>

    </div>
  )}

  {!isAdminRoute && <Footer />}

</div>

);
};

export default App;