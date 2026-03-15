import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";

import {
  placeOrderCOD,
  placeOrderStripe,
  userOrders,
  allOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

/* USER */

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/userorders", authUser, userOrders);

/* ADMIN */

orderRouter.post("/list", authAdmin, allOrders);
orderRouter.post("/status", authAdmin, updateStatus);

export default orderRouter;