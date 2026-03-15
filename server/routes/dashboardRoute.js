import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", authAdmin, getDashboardData);

export default dashboardRouter;