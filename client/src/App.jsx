import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

import Sidebar from "./components/admin/Sidebar";
import AdminLogin from "./components/admin/AdminLogin";

import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import Orders from "./pages/admin/Order";

import { ShopContext } from "./context/ShopContext";
import { Toaster } from "react-hot-toast";

import Wishlist from "./pages/Wishlish";

const App = () => {
  const { showUserLogin, isAdmin } = useContext(ShopContext);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="bg-primary min-h-screen">

      {/* LOGIN MODAL */}
      {showUserLogin && <Login />}

      {/* HEADER */}
      {!isAdminRoute && <Header />}

      <main className="text-tertiary overflow-hidden">

        <Toaster position="bottom-right" />

        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:category" element={<Collection />} />
          <Route path="/collection/:category/:id" element={<ProductDetails />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />


          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={isAdmin ? <Sidebar /> : <AdminLogin />}
          >
            <Route index element={<AddProduct />} />
            <Route path="list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>

        </Routes>

      </main>

      {/* FOOTER */}
      {!isAdminRoute && <Footer />}

    </div>
  );
};

export default App;