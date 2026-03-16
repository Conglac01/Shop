import express from "express";

import {
  userRegister,
  userLogin,
  logout,
  isAuth,
  syncCart,
  clearCart,
  toggleWishlist,
  getWishlist
} from "../controllers/userController.js";

import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

// ==============================
// AUTH
// ==============================

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", logout);

// ==============================
// USER
// ==============================

userRouter.get("/is-auth", authUser, isAuth);

// ==============================
// CART
// ==============================

userRouter.post("/sync-cart", authUser, syncCart);
userRouter.post("/clear-cart", authUser, clearCart);

// ==============================
// WISHLIST
// ==============================

userRouter.get("/wishlist", authUser, getWishlist);
userRouter.post("/toggle-wishlist", authUser, toggleWishlist);

export default userRouter;