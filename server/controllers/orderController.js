import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    
    console.log("📦 COD Order Data:", { userId, items, amount, address });

    const order = await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      status: "Order Placed"
    });

    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error("❌ COD Order Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, sessionId } = req.body;
    
    const order = await orderModel.create({
      userId,
      items,
      amount,
      address,
      sessionId,
      paymentMethod: "Stripe",
      paymentStatus: "Paid",
      status: "Order Placed"
    });

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error("❌ Stripe Order Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ ĐÃ SỬA - BỎ POPULATE items.product
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    
    console.log("📢 Fetching orders for user:", userId);
    
    const orders = await orderModel.find({ userId })
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${orders.length} orders for user`);
    
    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching user orders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ ĐÃ SỬA - BỎ POPULATE items.product
export const allOrders = async (req, res) => {
  try {
    console.log("📢 Fetching all orders for admin...");
    
    const orders = await orderModel.find({})
      .populate("userId", "name email") // Giữ lại populate userId
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${orders.length} orders`);
    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    console.log("📢 Updating order status:", { orderId, status });
    
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error("❌ Error updating status:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// GET ORDER BY ID (ADMIN) - THÊM MỚI
// ================================
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    console.log("📢 Fetching order by ID:", orderId);
    
    const order = await orderModel.findById(orderId)
      .populate("userId", "name email");

    if (!order) {
      console.log("❌ Order not found:", orderId);
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    console.log("✅ Order found:", order._id);
    
    res.json({ 
      success: true, 
      order 
    });
  } catch (error) {
    console.error("❌ Error fetching order:", error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};