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

  useEffect(() => {
    const handleSuccess = async () => {
      console.log("========== PAYMENT SUCCESS PAGE ==========");
      console.log("1. Session ID from URL:", sessionId);
      console.log("2. User from context:", user);
      console.log("3. User ID:", user?._id);
      console.log("4. User email:", user?.email);

      if (!sessionId) {
        console.log("❌ No sessionId found in URL");
        setLoading(false);
        return;
      }

      if (!user) {
        console.log("❌ No user found in context - not logged in?");
        setLoading(false);
        return;
      }

      try {
        console.log("5. Calling clear cart API...");
        
        const response = await axios.post("/api/user/clear-cart", {}, {
          withCredentials: true
        });
        
        console.log("6. Clear cart response:", response.data);
        
        if (response.data.success) {
          console.log("7. Clearing cart in context...");
          setCartItems({});
          console.log("8. Cart cleared successfully!");
        } else {
          console.log("9. Clear cart failed:", response.data.message);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("10. Error clearing cart:", error);
        console.error("11. Error response:", error.response?.data);
        console.error("12. Error status:", error.response?.status);
        setLoading(false);
      }
    };

    handleSuccess();
  }, [sessionId, user, setCartItems]);

  // Log khi component render
  console.log("Rendering PaymentSuccess - loading:", loading);

  return (
    <div className="min-h-screen flex items-center justify-center pt-28">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        {loading ? (
          <p className="text-gray-500">Processing your order...</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;