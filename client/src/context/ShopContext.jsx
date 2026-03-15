import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
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

  // =========================
  // STATE
  // =========================

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // =========================
  // CART (LOCAL STORAGE)
  // =========================

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // =========================
  // WISHLIST
  // =========================

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // =========================
  // PRODUCT MAP (OPTIMIZE)
  // =========================

  const productMap = useMemo(() => {
    const map = {};
    products.forEach((p) => (map[p._id] = p));
    return map;
  }, [products]);

  // =========================
  // AUTO LOGOUT TIMER
  // =========================

  const logoutTimerRef = useRef(null);
  const INACTIVE_TIMEOUT = 30 * 60 * 1000;

  const handleAutoLogout = useCallback(async () => {
    try {
      await axios.post("/api/user/logout");
      setUser(null);
      toast("Logged out due to inactivity");
      navigate("/");
    } catch (error) {
      console.log("Auto logout error:", error.message);
    }
  }, [navigate]);

  const resetLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    if (user) {
      logoutTimerRef.current = setTimeout(
        handleAutoLogout,
        INACTIVE_TIMEOUT
      );
    }
  }, [user, handleAutoLogout]);

  useEffect(() => {
    const events = ["mousedown", "keydown", "scroll", "touchstart"];

    const handleUserActivity = () => resetLogoutTimer();

    if (user) {
      events.forEach((event) =>
        window.addEventListener(event, handleUserActivity)
      );

      resetLogoutTimer();
    }

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleUserActivity)
      );

      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, [user, resetLogoutTimer]);

  // =========================
  // CART MERGE
  // =========================

  const mergeCart = (localCart, serverCart) => {
    const merged = { ...localCart };

    for (const itemId in serverCart) {
      if (!merged[itemId]) {
        merged[itemId] = serverCart[itemId];
      } else {
        for (const size in serverCart[itemId]) {
          merged[itemId][size] =
            (merged[itemId][size] || 0) + serverCart[itemId][size];
        }
      }
    }

    return merged;
  };

  // =========================
  // SYNC CART TO SERVER
  // =========================

  const syncCartToServer = async (cart) => {
    if (!user) return;

    try {
      await axios.post("/api/user/sync-cart", { cartData: cart });
    } catch (error) {
      console.log("Sync cart error:", error.message);
    }
  };

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/product/list");

      if (data.success && data.products?.length > 0) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log("Product API error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH USER
  // =========================

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);

        const serverCart = data.user.cartData || {};

        const mergedCart = mergeCart(cartItems, serverCart);

        setCartItems(mergedCart);

        await syncCartToServer(mergedCart);
      }
    } catch {
      setUser(null);
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
  // LOGOUT
  // =========================

  const logout = async (clearCart = false) => {
    try {
      const { data } = await axios.post("/api/user/logout");

      if (data.success) {
        setUser(null);

        if (clearCart) {
          setCartItems({});
          localStorage.removeItem("cartItems");
        }

        toast.success("Logged out");

        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);

    if (exists) {
      setWishlist((prev) =>
        prev.filter((item) => item._id !== product._id)
      );
      toast.success("Removed from wishlist");
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Added to wishlist");
    }
  };

  // =========================
  // CART FUNCTIONS
  // =========================

  const addToCart = (itemId, size) => {
    if (!size) return toast.error("Select size");

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};

    if (!cartData[itemId][size]) cartData[itemId][size] = 0;

    cartData[itemId][size] += 1;

    setCartItems(cartData);

    syncCartToServer(cartData);

    toast.success("Added to cart");
  };

  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);

      syncCartToServer(cartData);
    }
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId] || !cartData[itemId][size]) return;

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    syncCartToServer(cartData);
  };

  const getCartCount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }

    return total;
  };

  const getCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const product = productMap[itemId];

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
    fetchUser();
  }, []);

  const value = {
    navigate,
    axios,

    user,
    setUser,

    products,
    loading,

    searchQuery,
    setSearchQuery,

    currency,
    delivery_charges,

    showUserLogin,
    setShowUserLogin,

    cartItems,
    setCartItems,

    addToCart,
    removeFromCart,
    updateQuantity,

    getCartCount,
    getCartAmount,

    wishlist,
    toggleWishlist,

    isAdmin,
    setIsAdmin,

    logout,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopContextProvider };