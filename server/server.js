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

// ✅ KHÔNG connect DB ở top-level nữa

// ✅ QUAN TRỌNG: Webhook phải đặt trước express.json()
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// Middleware
app.use(express.json());
app.use(cookieParser());

// 🔥 SỬA CORS - THÊM DOMAIN VERCEL MỚI
const allowedOrigins = [
    'http://localhost:5173',
    'https://shop-seven-roan-99.vercel.app'  // link web mới
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("API successfully connected!");
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin', adminUserRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/payment", paymentRoutes);

// ✅ START SERVER SAU KHI DB READY
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();