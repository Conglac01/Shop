import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = () => {

  const { cartItems, products, getCartAmount, navigate } =
    useContext(ShopContext);

  const [address, setAddress] = useState({
    name: "",
    city: "",
    phone: ""
  });

  const placeOrder = async () => {

    try {

      let orderItems = [];

      for (const itemId in cartItems) {

        const product = products.find(p => p._id === itemId);

        for (const size in cartItems[itemId]) {

          orderItems.push({
            productId: itemId,
            name: product.name,
            price: product.offerPrice,
            size,
            quantity: cartItems[itemId][size]
          });

        }

      }

      const orderData = {
        items: orderItems,
        amount: getCartAmount(),
        address
      };

      const { data } = await axios.post(
        "/api/order/cod",
        orderData
      );

      if (data.success) {

        toast.success("Order placed");

        navigate("/my-orders");

      }

    } catch (error) {

      toast.error("Order failed");

    }

  };

  return (
    <div className="max-w-xl mx-auto py-20">

      <h2 className="text-2xl font-bold mb-6">
        Checkout
      </h2>

      <input
        placeholder="Name"
        className="border p-3 w-full mb-3"
        onChange={(e)=>setAddress({...address,name:e.target.value})}
      />

      <input
        placeholder="City"
        className="border p-3 w-full mb-3"
        onChange={(e)=>setAddress({...address,city:e.target.value})}
      />

      <input
        placeholder="Phone"
        className="border p-3 w-full mb-6"
        onChange={(e)=>setAddress({...address,phone:e.target.value})}
      />

      <button
        onClick={placeOrder}
        className="bg-black text-white px-6 py-3"
      >
        Place Order
      </button>

    </div>
  );

};

export default PlaceOrder;