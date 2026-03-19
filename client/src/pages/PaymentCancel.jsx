import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made.
        </p>
        <Link
          to="/cart"
          className="bg-secondary text-white px-6 py-3 rounded-lg inline-block hover:opacity-90"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;