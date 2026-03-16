import React, { useContext, useState, useEffect, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbTruckDelivery, TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    productMap,
    currency,
    cartItems,
    updateQuantity,
    getCartCount,
    getCartAmount,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [hoveredBtn, setHoveredBtn] = useState({ id: null, type: null });

  const coupons = {
    save20: 0.2,
    welcome10: 0.1,
    vip30: 0.3,
  };

  // =========================
  // FORMAT PRICE
  // =========================

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // =========================
  // BUILD CART DATA
  // =========================

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  // =========================
  // QUANTITY
  // =========================

  const increment = (id, size) => {
    const newQuantity = (cartItems[id][size] || 0) + 1;
    updateQuantity(id, size, newQuantity);
  };

  const decrement = (id, size) => {
    const newQuantity = Math.max((cartItems[id][size] || 0) - 1, 0);
    updateQuantity(id, size, newQuantity);
  };

  const handleRemoveItem = (id, size) => {
    if (window.confirm("Remove this item from cart?")) {
      updateQuantity(id, size, 0);
      toast.success("Item removed");
    }
  };

  // =========================
  // COUPON
  // =========================

  const applyCoupon = () => {
    const code = couponCode.toLowerCase();

    if (coupons[code]) {
      setDiscount(coupons[code]);
      toast.success("Coupon applied!");
    } else {
      toast.error("Invalid coupon");
    }
  };

  // =========================
  // TOTAL
  // =========================

  const subtotal = useMemo(() => getCartAmount(), [cartItems]);

  const shipping = subtotal > 500 ? 0 : 10;

  const discountAmount = subtotal * discount;

  const total = subtotal - discountAmount + shipping;

  return (
    <div className="max-padd-container py-16 pt-28">

      <Title title1={"Shopping"} title2={"Cart"} titleStyles={"pb-5"} />

      {cartData.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ================= CART ITEMS ================= */}

          <div className="lg:w-2/3 space-y-4">

            {cartData.map((item, i) => {
              const product = productMap?.[item._id] || products.find(p => p._id === item._id);

              if (!product) return null;

              return (
                <div
                  key={i}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex gap-4 items-center"
                >

                  {/* IMAGE */}

                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  {/* INFO */}

                  <div className="flex-1">

                    <h5 className="font-semibold">{product.name}</h5>

                    <p className="text-sm text-gray-500 mt-1">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>

                    {/* QUANTITY */}

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() => decrement(item._id, item.size)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >
                        <FaMinus className="text-xs" />
                      </button>

                      <span className="font-medium w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increment(item._id, item.size)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                      >
                        <FaPlus className="text-xs" />
                      </button>

                    </div>

                  </div>

                  {/* PRICE */}

                  <div className="text-right">

                    <p className="font-bold text-secondary">
                      {formatPrice(product.offerPrice * item.quantity)}
                    </p>

                    <button
                      onClick={() => handleRemoveItem(item._id, item.size)}
                      className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 mt-2"
                    >
                      <FaTrash size={12} />
                      Remove
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <div className="lg:w-1/3">

            <div className="bg-white p-6 rounded-lg shadow-sm">

              <h4 className="text-xl font-bold mb-6 border-b pb-4">
                Order Summary
              </h4>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

              </div>

              {/* COUPON */}

              <div className="mt-6">

                <div className="flex gap-2">

                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border p-3 rounded-lg"
                  />

                  <button
                    onClick={applyCoupon}
                    className="bg-black text-white px-4 rounded-lg"
                  >
                    Apply
                  </button>

                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Try: SAVE20
                </p>

              </div>

              {/* CHECKOUT */}

              <Link
                to="/place-order"
                className="block w-full text-center bg-secondary text-white py-4 rounded-lg font-semibold mt-6 hover:opacity-90"
              >
                Proceed to Checkout
              </Link>

              {/* FEATURES */}

              <div className="space-y-3 pt-6 mt-6 border-t">

                <div className="flex items-center gap-3 text-sm">
                  <RiSecurePaymentLine className="text-lg text-secondary" />
                  Secure Payment
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <TbTruckDelivery className="text-lg text-secondary" />
                  Free Delivery over $500
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <TbArrowBackUp className="text-lg text-secondary" />
                  7 Days Return
                </div>

              </div>

            </div>

          </div>

        </div>

      ) : (

        /* EMPTY CART */

        <div className="text-center py-20">

          <h3 className="text-xl font-semibold mb-2">
            Your cart is empty
          </h3>

          <p className="text-gray-400 mb-6">
            Looks like you haven't added anything yet
          </p>

          <Link
            to="/collection"
            className="bg-secondary text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>

        </div>

      )}
    </div>
  );
};

export default Cart;