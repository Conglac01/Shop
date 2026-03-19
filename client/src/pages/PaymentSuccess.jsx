import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, setCartItems } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSuccess = async () => {
      console.log("✅ Payment Success Page Loaded");
      console.log("Session ID:", sessionId);
      console.log("User from context:", user);

      if (!sessionId) {
        console.log("❌ No sessionId found");
        setError("No session ID found");
        setLoading(false);
        return;
      }

      // Kiểm tra user
      if (!user) {
        console.log("❌ No user found - trying to fetch user...");
        
        // Thử fetch user lại
        try {
          const { data } = await axios.get("/api/user/is-auth", {
            withCredentials: true
          });
          
          if (data.success && data.user) {
            console.log("✅ User fetched successfully:", data.user);
            // Tiếp tục xóa cart
            await clearUserCart(data.user._id);
          } else {
            setError("Please login again");
            setLoading(false);
          }
        } catch (err) {
          console.error("❌ Failed to fetch user:", err);
          setError("Session expired. Please login again.");
          setLoading(false);
        }
        return;
      }

      // Có user rồi, xóa cart
      await clearUserCart(user._id);
    };

    const clearUserCart = async (userId) => {
      try {
        console.log("🔄 Clearing cart for user:", userId);
        
        const response = await axios.post("/api/user/clear-cart", {}, {
          withCredentials: true
        });
        
        console.log("✅ Clear cart response:", response.data);
        
        if (response.data.success) {
          setCartItems({});
          console.log("✅ Cart cleared successfully!");
        } else {
          setError(response.data.message);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("❌ Error clearing cart:", error);
        if (error.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError(error.response?.data?.message || "Failed to clear cart");
        }
        setLoading(false);
      }
    };

    handleSuccess();
  }, [sessionId, user, setCartItems]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <FaCheckCircle className="text-yellow-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">
            Your payment was successful, but we need you to login again.
          </p>
          <p className="text-red-500 mb-6">{error}</p>
          <Link
            to="/login"
            className="bg-secondary text-white px-6 py-3 rounded-lg inline-block hover:opacity-90 transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-28">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/my-orders"
            className="bg-secondary text-white px-6 py-3 rounded-lg inline-block hover:opacity-90 transition"
          >
            View My Orders
          </Link>
          <Link
            to="/collection"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-gray-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;