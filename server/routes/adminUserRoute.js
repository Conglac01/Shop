import express from "express";
import authAdmin from "../middleware/authAdmin.js";

import {
  getUsers,
  deleteUser,
  blockUser
} from "../controllers/adminUserController.js";

const adminUserRouter = express.Router();

adminUserRouter.get("/users", authAdmin, getUsers);

adminUserRouter.delete("/user/:id", authAdmin, deleteUser);

adminUserRouter.post("/block/:id", authAdmin, blockUser);

export default adminUserRouter;