import express from "express";

import {
  userRegister,
  userLogin,
  logout,
  isAuth,
  syncCart
} from "../controllers/userController.js";

import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", logout);

userRouter.get("/is-auth", authUser, isAuth);

userRouter.post("/sync-cart", authUser, syncCart);

export default userRouter;