import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";

import userImg from "../assets/user.png";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const {
    user,
    logout,
    navigate,
    searchQuery,
    setSearchQuery,
    setShowUserLogin,
    getCartCount,
  } = useContext(ShopContext);

  const location = useLocation();

  const [menuOpened, setMenuOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const userMenuRef = useRef(null);

  const isHomepage = location.pathname === "/";
  const isCollectionPage = location.pathname.includes("/collection");

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  const displayName = user?.name?.split(" ")[0] || "User";

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Navigate search
  useEffect(() => {
    if (debouncedSearch && !isCollectionPage) {
      navigate("/collection");
    }
  }, [debouncedSearch, isCollectionPage, navigate]);

  // Click outside close user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = useMemo(() => getCartCount(), [getCartCount]);

  return (
    <>
      {!isHomepage && (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-l from-primary via-white to-primary h-[72px] z-40" />
      )}

      <header
        className={`top-0 left-0 w-full z-50 transition-all duration-300 ${
          isSticky ? "fixed bg-white shadow-md" : "absolute"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between py-3">

          {/* Logo */}
          <Link to="/" className="bold-22 uppercase font-pacifico">
            Shop <span className="text-secondary bold-28">.</span>
          </Link>

          {/* Navbar */}
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyles={
            menuOpened
                ? "flex flex-col gap-6 fixed top-16 right-6 bg-white p-6 shadow-xl rounded-lg z-50"
                : "hidden lg:flex items-center gap-x-10"
            }
/>

          {/* Right icons */}
          <div className="flex gap-8 items-center">

            {/* Search */}
            <div className="relative hidden xl:flex">

              {showSearch && (
                <div className="flex rounded-full bg-white w-[333px] p-3.5 pl-6 items-center gap-3 shadow">
                  <input
                    type="text"
                    value={searchQuery || ""}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent w-full outline-none text-[14px]"
                  />

                  <FaSearch
                    className="text-xl cursor-pointer"
                    onClick={() => setShowSearch(false)}
                  />
                </div>
              )}

              <div
                onClick={() => setShowSearch((prev) => !prev)}
                className={`cursor-pointer bg-tertiary text-white rounded-full p-2.5 text-sm m-1 ${
                  showSearch ? "absolute top-0 right-0" : ""
                }`}
              >
                <FaSearch className="text-xl" />
              </div>

            </div>

            {/* Cart */}
            <div
              onClick={() => navigate("/cart")}
              className="flex gap-2 items-center cursor-pointer p-2 rounded-full bg-white relative"
            >
              <FaShoppingBasket size={26} />

              <span className="absolute bottom-8 -right-2 text-xs font-bold bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>

            {/* User */}
            <div className="relative" ref={userMenuRef}>

              {user ? (
                <>
                  <div
                    className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 rounded-full py-1 pl-1 pr-3 hover:shadow-md transition"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                  >
                    <img
                      src={user?.avatar || userImg}
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <span className="text-sm font-medium hidden sm:block">
                      {displayName}
                    </span>

                    <FiChevronDown className="text-gray-500" />
                  </div>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">

                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/my-orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>

                      <div className="border-t my-1"></div>

                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>

                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setShowUserLogin(true)}
                  className="btn-dark flexCenter gap-x-2 rounded-full px-4 py-2"
                >
                  <RiUserLine className="text-lg" />
                  <span className="text-sm font-medium">Login</span>
                </button>
              )}

            </div>

            {/* Mobile menu */}
            <div className="lg:hidden">
              {menuOpened ? (
                <FaBarsStaggered
                  onClick={toggleMenu}
                  className="cursor-pointer text-xl"
                />
              ) : (
                <FaBars
                  onClick={toggleMenu}
                  className="cursor-pointer text-xl"
                />
              )}
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;