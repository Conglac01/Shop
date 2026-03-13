import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Global variables for payment
const currency = "pkr";
const deliveryCharges = 0; // Free shipping

// Place order using COD = /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        if (items.length === 0) {
            return res.json({ success: false, message: "Please add product first" });
        }

        // calculate amount using items
        let subtotal = 0;
        for (const item of items) {
            const product = await productModel.findById(item.product);
            if (!product) {
                return res.json({ success: false, message: "Product not found" });
            }
            subtotal += product.offerPrice * item.quantity;
        }

        // calculate total (free shipping)
        const totalAmount = subtotal; // Không cộng deliveryCharges vì đã = 0

        // Create order
        const orderData = {
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "COD",
            isPaid: false,
            status: "Order Placed"
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear user's cart after order placed
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ 
            success: true, 
            message: "Order Placed Successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Place Order using Stripe = /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        // Stripe implementation will go here
        res.json({ success: true, message: "Stripe payment coming soon" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ALL Orders data for Frontend by UserId = /api/order/userorders
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await orderModel.find({ 
            userId, 
            $or: [{ paymentMethod: "COD" }, { isPaid: true }] 
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ALL Orders data for Admin panel = /api/order/list
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ 
            $or: [{ paymentMethod: "COD" }, { isPaid: true }] 
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Updating order status from admin panel = /api/order/status
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Order Status Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};