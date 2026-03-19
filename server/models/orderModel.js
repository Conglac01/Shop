import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    image: String
  }],
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Order Placed"
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Stripe"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  sessionId: {
    type: String,
    sparse: true
  },
  customerDetails: {
    type: Object
  }
}, {
  timestamps: true
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;