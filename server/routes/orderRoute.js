import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";

import {
  placeOrderCOD,
  placeOrderStripe,
  userOrders,
  allOrders,
  updateStatus,
   getOrderById 
} from "../controllers/orderController.js";

const orderRouter = express.Router();

/* USER */
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/user-orders", authUser, userOrders);  

/* ADMIN */
orderRouter.post("/list", authAdmin, allOrders);
orderRouter.post("/status", authAdmin, updateStatus);
orderRouter.get("/:orderId", authAdmin, getOrderById);

export default orderRouter;