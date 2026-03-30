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

// ✅ TẠO AXIOS INSTANCE VỚI CẤU HÌNH CHUẨN
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const delivery_charges = 0;

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const productMap = useMemo(() => {
    const map = {};
    products.forEach((p) => (map[p._id] = p));
    return map;
  }, [products]);

  const logoutTimerRef = useRef(null);
  const INACTIVE_TIMEOUT = 30 * 60 * 1000;

  const handleAutoLogout = useCallback(async () => {
    try {
      await api.post("/api/user/logout");
      setUser(null);
      setCartItems({});
      setWishlist([]);
      toast("Logged out due to inactivity");
      navigate("/");
    } catch (error) {
      console.log(error.message);
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

  const mergeCart = (localCart, serverCart) => {
    const merged = { ...serverCart };

    for (const itemId in localCart) {
      if (!merged[itemId]) merged[itemId] = {};

      for (const size in localCart[itemId]) {
        merged[itemId][size] =
          (merged[itemId][size] || 0) + localCart[itemId][size];
      }
    }

    return merged;
  };

  const syncCartToServer = async (cart) => {
    if (!user) return;

    try {
      await api.post("/api/user/sync-cart", {
        cartData: cart,
      });
    } catch (error) {
      console.log("Sync cart error:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/api/product/list");

      if (data.success && data.products?.length > 0) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log("Product API error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    if (!user) return;

    try {
      const { data } = await api.get("/api/user/wishlist");

      if (data.success) {
        const wishlistIds = data.wishlist.map(item => item._id);
        setWishlist(wishlistIds);
      }
    } catch (error) {
      console.log("Wishlist fetch error:", error.message);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);

        const serverCart = data.user.cartData || {};
        const localCart =
          JSON.parse(localStorage.getItem("cart_guest")) || {};

        const mergedCart = mergeCart(localCart, serverCart);

        setCartItems(mergedCart);

        await syncCartToServer(mergedCart);

        localStorage.removeItem("cart_guest");

        await fetchWishlist();
      }
    } catch {
      setUser(null);
    }
  };

  const fetchAdmin = async () => {
    try {
      const { data } = await api.get("/api/admin/is-auth");
      setIsAdmin(data.success);
    } catch {
      setIsAdmin(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post("/api/user/logout");

      if (data.success) {
        setUser(null);
        setCartItems({});
        setWishlist([]);
        toast.success("Logged out");
        navigate("/");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  // ✅ Add to cart - chỉ cho user đã login
  const addToCart = (itemId, size) => {
    if (!user) {
      toast.error("Please login to add to cart");
      setShowUserLogin(true);
      return;
    }

    if (!size) {
      toast.error("Select size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};

    if (!cartData[itemId][size]) cartData[itemId][size] = 0;

    cartData[itemId][size] += 1;

    setCartItems(cartData);
    syncCartToServer(cartData);
    toast.success("Added to cart");
  };

  const removeFromCart = (itemId, size) => {
    if (!user) return;

    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
      syncCartToServer(cartData);
      toast.success("Removed from cart");
    }
  };

  const updateQuantity = (itemId, size, quantity) => {
    if (!user) return;

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
    syncCartToServer(cartData);
  };

  const getCartCount = () => {
    if (!user) return 0;

    let total = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }

    return total;
  };

  const getCartAmount = () => {
    if (!user) return 0;

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

  // ================================
  // TOGGLE WISHLIST
  // ================================
  const toggleWishlist = async (productId) => {
    if (!user) {
      toast.error("Please login to use wishlist");
      setShowUserLogin(true);
      return;
    }

    try {
      const isInWishlist = wishlist.includes(productId);
      
      if (isInWishlist) {
        setWishlist(prev => prev.filter(id => id !== productId));
      } else {
        setWishlist(prev => [...prev, productId]);
      }

      const { data } = await api.post("/api/user/toggle-wishlist", {
        productId,
      });

      if (!data.success) {
        if (isInWishlist) {
          setWishlist(prev => [...prev, productId]);
        } else {
          setWishlist(prev => prev.filter(id => id !== productId));
        }
        toast.error(data.message || "Failed to update wishlist");
      } else {
        setWishlist(data.wishlist);
        toast.success(
          isInWishlist 
            ? "Removed from wishlist" 
            : "Added to wishlist"
        );
      }
    } catch (error) {
      console.log("Wishlist toggle error:", error.message);
      toast.error("Network error. Please try again.");
      await fetchWishlist();
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAdmin();
    fetchUser();
  }, []);

  const value = {
    navigate,
    axios: api,  // ✅ dùng api instance thay vì axios mặc định

    user,
    setUser,

    products,
    productMap,
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