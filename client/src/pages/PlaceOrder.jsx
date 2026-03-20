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
    currency,
    user,
    setCartItems  // ✅ THÊM setCartItems
  } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(""); // ✅ Thêm state cho lỗi phone

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

  // ✅ Hàm xử lý change phone - CHỈ CHO PHÉP NHẬP SỐ
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép số (0-9)
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Giới hạn độ dài 10-11 số
    if (numericValue.length <= 11) {
      setAddress({...address, phone: numericValue});
      
      // Validate realtime
      if (numericValue.length > 0 && numericValue.length < 10) {
        setPhoneError("Số điện thoại phải có ít nhất 10 số");
      } else if (numericValue.length > 11) {
        setPhoneError("Số điện thoại không được quá 11 số");
      } else {
        setPhoneError("");
      }
    }
  };

  const validateForm = () => {
    if (!address.name.trim()) {
      toast.error("Vui lòng nhập họ tên");
      return false;
    }
    if (!address.city.trim()) {
      toast.error("Vui lòng nhập thành phố");
      return false;
    }
    if (!address.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return false;
    }
    
    // ✅ Kiểm tra phone number chỉ chứa số và đủ độ dài
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(address.phone)) {
      toast.error("Số điện thoại không hợp lệ! Vui lòng nhập 10-11 chữ số");
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
        price: item.offerPrice || item.price,
        size: item.size,
        quantity: item.quantity,
        image: item.image?.[0] || ""
      }));

      console.log("🔄 Payment Method:", paymentMethod);
      console.log("📦 User:", user);
      console.log("📦 Order Items:", orderItems);

      // Stripe payment
      if (paymentMethod === "stripe") {
        console.log("💳 Calling Stripe API...");
        
        try {
          const { data } = await axios.post("/api/payment/create-checkout-session", {
            items: orderItems.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            })),
            email: user?.email || "guest@example.com"
          });

          console.log("✅ Stripe response:", data);

          if (data.url) {
            window.location.href = data.url;
          } else {
            toast.error("Payment failed: No URL returned");
          }
        } catch (stripeError) {
          console.error("❌ Stripe API Error:", stripeError);
          console.error("Error response:", stripeError.response?.data);
          toast.error(stripeError.response?.data?.error || "Stripe payment failed");
        }
        return;
      }

      // COD payment
      if (paymentMethod === "cod") {
        console.log("💵 Calling COD API...");
        
        const orderData = {
          userId: user?._id,
          items: orderItems,
          amount: getCartAmount(),
          address,
          paymentMethod
        };

        console.log("📦 Order Data:", orderData);

        try {
          const { data } = await axios.post("/api/order/cod", orderData);
          console.log("✅ COD response:", data);

          if (data.success) {
            // ✅ XÓA GIỎ HÀNG NGAY LẬP TỨC
            setCartItems({}); // Xóa trong context
            
            // ✅ GỌI API CLEAR CART TRÊN SERVER
            await axios.post("/api/user/clear-cart", {}, {
              withCredentials: true
            });
            
            toast.success("Đặt hàng thành công!");
            navigate("/my-orders");
          } else {
            toast.error(data.message || "Đặt hàng thất bại");
          }
        } catch (codError) {
          console.error("❌ COD API Error:", codError);
          console.error("Error response:", codError.response?.data);
          toast.error(codError.response?.data?.message || "COD order failed");
        }
      }

    } catch (error) {
      console.error("❌ Order error:", error);
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-padd-container py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
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
            
            {/* ✅ PHONE INPUT ĐÃ SỬA */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className={`w-full border p-3 rounded ${
                  phoneError ? 'border-red-500' : ''
                }`}
                value={address.phone}
                onChange={handlePhoneChange}
                maxLength={11}
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
              {address.phone && !phoneError && address.phone.length >= 10 && (
                <p className="text-green-500 text-sm mt-1">✓ Số điện thoại hợp lệ</p>
              )}
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-10 mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod==="cod"}
                onChange={()=>setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod==="stripe"}
                onChange={()=>setPaymentMethod("stripe")}
              />
              Stripe (Credit Card)
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="border rounded p-4 space-y-4">
            {cartProducts.map((item,index)=>(
              <div key={index} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-xs">
                    Size: {item.size} × {item.quantity}
                  </p>
                </div>
                <p>{currency}{item.offerPrice * item.quantity}</p>
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
            className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;