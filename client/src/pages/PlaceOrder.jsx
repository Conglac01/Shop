import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const PlaceOrder = () => {

  const {
    cartItems,
    products,
    getCartAmount,
    navigate,
    axios,
    currency
  } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    city: "",
    phone: ""
  });

  const cartProducts = [];

  for (const itemId in cartItems) {

    const product = products.find(p => p._id === itemId);

    if (!product) continue;

    for (const size in cartItems[itemId]) {

      cartProducts.push({
        ...product,
        size,
        quantity: cartItems[itemId][size]
      });

    }

  }

  const validateForm = () => {

    if (!address.name.trim()) {
      toast.error("Enter your name");
      return false;
    }

    if (!address.city.trim()) {
      toast.error("Enter your city");
      return false;
    }

    if (!address.phone.trim()) {
      toast.error("Enter your phone");
      return false;
    }

    return true;

  };

  const placeOrder = async () => {

    if (!validateForm()) return;

    try {

      setLoading(true);

      const orderItems = cartProducts.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.offerPrice,
        size: item.size,
        quantity: item.quantity
      }));

      const orderData = {
        items: orderItems,
        amount: getCartAmount(),
        address,
        paymentMethod
      };

      const { data } = await axios.post("/api/order/cod", orderData);

      if (data.success) {

        toast.success("Order placed successfully");

        navigate("/my-orders");

      } else {

        toast.error("Order failed");

      }

    } catch (error) {

      toast.error("Order failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="max-padd-container py-16">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* LEFT - SHIPPING */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Shipping Address
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded"
              value={address.name}
              onChange={(e)=>setAddress({...address,name:e.target.value})}
            />

            <input
              type="text"
              placeholder="City"
              className="w-full border p-3 rounded"
              value={address.city}
              onChange={(e)=>setAddress({...address,city:e.target.value})}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-3 rounded"
              value={address.phone}
              onChange={(e)=>setAddress({...address,phone:e.target.value})}
            />

          </div>

          {/* PAYMENT */}

          <h2 className="text-xl font-semibold mt-10 mb-4">
            Payment Method
          </h2>

          <div className="space-y-3">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                checked={paymentMethod==="cod"}
                onChange={()=>setPaymentMethod("cod")}
              />

              Cash on Delivery

            </label>

            <label className="flex items-center gap-3 cursor-pointer opacity-50">

              <input type="radio" disabled />

              Stripe (coming soon)

            </label>

          </div>

        </div>

        {/* RIGHT - ORDER SUMMARY */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="border rounded p-4 space-y-4">

            {cartProducts.map((item,index)=>(
              <div
                key={index}
                className="flex justify-between text-sm"
              >

                <div>

                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-gray-500 text-xs">
                    Size: {item.size} × {item.quantity}
                  </p>

                </div>

                <p>
                  {currency}{item.offerPrice * item.quantity}
                </p>

              </div>
            ))}

            <hr />

            <div className="flex justify-between text-sm">
              <p>Subtotal</p>
              <p>{currency}{getCartAmount()}</p>
            </div>

            <div className="flex justify-between text-sm">
              <p>Shipping</p>
              <p>Free</p>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>{currency}{getCartAmount()}</p>
            </div>

          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >

            {loading ? "Placing Order..." : "Place Order"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default PlaceOrder;