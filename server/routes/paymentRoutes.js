import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import mongoose from "mongoose"; // ✅ THÊM
import authUser from "../middleware/authUser.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", authUser, async (req, res) => {
  try {
    const { items, email, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in cart" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      customer_email: email,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        userId: userId,
        items: JSON.stringify(items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image || ""
        }))),
        address: JSON.stringify(address || {}),
      },
    });

    res.json({ url: session.url });
    
  } catch (error) {
    console.error("❌ Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ WEBHOOK
router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // ✅ CHECK DB READY
      if (mongoose.connection.readyState !== 1) {
        console.log("❌ DB not ready, skip webhook");
        return res.status(500).send("DB not ready");
      }

      const items = JSON.parse(session.metadata.items || "[]");
      const addressFromMetadata = JSON.parse(session.metadata.address || "{}");

      const order = await orderModel.create({
        userId: session.metadata.userId,
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image || ""
        })),
        amount: session.amount_total / 100,
        address: addressFromMetadata,
        paymentMethod: "Stripe",
        paymentStatus: "Paid",
        status: "Order Placed",
        sessionId: session.id,
        customerDetails: {
          email: session.customer_details?.email,
          name: session.customer_details?.name
        }
      });

      await userModel.findByIdAndUpdate(
        session.metadata.userId,
        { 
          $push: { orders: order._id },
          cartData: {}
        }
      );

      console.log("✅ Order created:", order._id);

    } catch (error) {
      console.error("❌ Failed to save order:", error.message);
    }
  }

  res.json({ received: true });
});

export default router;