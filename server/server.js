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
import adminUserRouter from './routes/adminUserRoute.js'
import dashboardRouter from "./routes/dashboardRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";


const app = express(); // Initialize Express Application
const port = process.env.PORT || 4000; // Define server port

await connectDB()
await connectCloudinary()// setup cloudinary for image storage

// Allow multiple origin
const allowedOrigins = ['http://localhost:5173'];

// Middleware Setup
app.use(express.json()); // Enables JSON request body parsing
app.use(cookieParser()); // Cookie-parser middleware to parse HTTP request cookies
app.use(cors({
    origin: allowedOrigins, // Whitelist of allowed domains
    credentials: true // Required for cookies/authorization headers
}));

// Root endpoint to check API status
app.get("/", (req, res) => {
    res.send("API successfully connected!");
});

//define API routes
app.use('/api/user', userRouter);// Routes for user-related operation
app.use('/api/admin', adminRouter)
app.use('/api/admin', adminUserRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order',orderRouter)
app.use("/api/dashboard", dashboardRouter);
app.use("/api/payment", paymentRoutes); 


// Start the server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));