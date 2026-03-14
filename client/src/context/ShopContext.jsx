import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/data.js";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const delivery_charges = 0;

  const [user, setUser] = useState(null);

  // ⚡ PRODUCTS (KHÔNG LƯU LOCALSTORAGE NỮA)
  const [products, setProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(false); // THÊM state loading

  const [searchQuery, setSearchQuery] = useState("");
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // =========================
  // CART (có localStorage)
  // =========================

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // =========================
  // WISHLIST (có localStorage)
  // =========================

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {

    try {

      setLoading(true); // THÊM setLoading

      const { data } = await axios.get("/api/product/list");

      // CHỈ CẬP NHẬT NẾU API TRẢ VỀ DỮ LIỆU THẬT
      if (data.success && data.products && data.products.length > 0) {
        console.log("✅ Using real products from API:", data.products.length);
        setProducts(data.products);
      } else {
        console.log("ℹ️ No products from API, keeping dummy data");
        // GIỮ NGUYÊN dummyProducts, KHÔNG LÀM GÌ
      }

    } catch (error) {

      console.log("⚠️ API error, keeping dummy data:", error.message);
      // GIỮ NGUYÊN dummyProducts, KHÔNG LÀM GÌ

    } finally {
      setLoading(false); // THÊM setLoading trong finally
    }

  };

  // =========================
  // ADMIN AUTH
  // =========================

  const fetchAdmin = async () => {

    try {

      const { data } = await axios.get("/api/admin/is-auth");

      setIsAdmin(data.success);

    } catch {

      setIsAdmin(false);

    }

  };

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (product) => {

    const exists = wishlist.find(item => item._id === product._id);

    if (exists) {

      setWishlist(prev =>
        prev.filter(item => item._id !== product._id)
      );

      toast.success("Removed from wishlist");

    } else {

      setWishlist(prev => [...prev, product]);

      toast.success("Added to wishlist");

    }

  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (itemId, size) => {

    if (!size) return toast.error("Please select a size");

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    cartData[itemId][size] += 1;

    setCartItems(cartData);

    toast.success("Added to cart");

  };

  // =========================
  // CART COUNT
  // =========================

  const getCartCount = () => {

    let totalCount = 0;

    for (const itemId in cartItems) {

      for (const size in cartItems[itemId]) {

        totalCount += cartItems[itemId][size];

      }

    }

    return totalCount;

  };

  // =========================
  // UPDATE CART
  // =========================

  const updateQuantity = (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

  };

  // =========================
  // CART TOTAL
  // =========================

  const getCartAmount = () => {

    let total = 0;

    for (const itemId in cartItems) {

      const product = products.find(p => p._id === itemId);

      if (!product) continue;

      const price = product.offerPrice ?? product.price ?? 0;

      for (const size in cartItems[itemId]) {

        total += price * cartItems[itemId][size];

      }

    }

    return total;

  };

  // =========================
  // INIT
  // =========================

  useEffect(() => {

    fetchProducts();
    fetchAdmin();

  }, []);

  const value = {

    navigate,
    axios,

    user,
    setUser,

    products,
    loading, // THÊM loading vào value

    searchQuery,
    setSearchQuery,

    currency,
    delivery_charges,

    showUserLogin,
    setShowUserLogin,

    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,

    wishlist,
    toggleWishlist,

    isAdmin,
    setIsAdmin

  };

  return (

    <ShopContext.Provider value={value}>

      {children}

    </ShopContext.Provider>

  );

};

export { ShopContext, ShopContextProvider };