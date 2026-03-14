import React, { useContext, useEffect } from "react";
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

// Admin imports
import Sidebar from "./components/admin/Sidebar";
import AdminLogin from "./components/admin/AdminLogin";
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import Orders from "./pages/admin/Order";
import EditProduct from './pages/admin/EditProduct';
import OrderDetail from './pages/admin/OrderDetail';

import { ShopContext } from "./context/ShopContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { showUserLogin, isAdmin, setIsAdmin } = useContext(ShopContext);
  const location = useLocation();

  // Kiểm tra token trong localStorage khi component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && !isAdmin) {
      setIsAdmin(true);
    }
  }, [isAdmin, setIsAdmin]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Protected route component
  const AdminRoute = ({ children }) => {
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      {/* LOGIN MODAL */}
      {showUserLogin && <Login />}

      {/* HEADER - chỉ hiển thị khi không phải admin route */}
      {!isAdminRoute && <Header />}

      <main className={`text-tertiary flex-grow ${isAdminRoute ? 'p-0' : 'container mx-auto px-4'}`}>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

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

          {/* ADMIN LOGIN ROUTE */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN ROUTES */}
          <Route path="/admin" element={<AdminRoute><Sidebar /></AdminRoute>}>
            <Route index element={<AddProduct />} />
            <Route path="list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600">Page not found</p>
            </div>
          } />
        </Routes>
      </main>

      {/* FOOTER - chỉ hiển thị khi không phải admin route */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;