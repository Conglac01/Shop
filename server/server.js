import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRoute.js';  
import adminUserRouter from './routes/adminUserRoute.js';
import dashboardRouter from "./routes/dashboardRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// ✅ QUAN TRỌNG: Webhook phải được đặt TRƯỚC express.json()
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// Middleware cho các route khác
app.use(express.json());
app.use(cookieParser());

// CORS config
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Root endpoint
app.get("/", (req, res) => {
    res.send("API successfully connected!");
});

// API routes
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin', adminUserRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/payment", paymentRoutes);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));