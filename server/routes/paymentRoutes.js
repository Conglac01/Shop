import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import authUser from "../middleware/authUser.js";
import orderModel from "../models/orderModel.js";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", authUser, async (req, res) => {
  try {
    const { items, email } = req.body;
    const userId = req.userId;

    console.log("📦 Items received:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in cart" });
    }

    // ✅ FIX: Không gửi ảnh lên Stripe (vì ảnh local không phải URL hợp lệ)
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // ❌ Bỏ images để tránh lỗi "Not a valid URL"
          // images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    console.log("✅ Line items created:", line_items);

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
          quantity: item.quantity
          // ❌ Không gửi image vào metadata
        }))),
      },
    });

    console.log("✅ Session created:", session.id);
    res.json({ url: session.url });
    
  } catch (error) {
    console.error("❌ Stripe error:", error.message);
    console.error("❌ Full error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("✅ Payment successful:", session.id);

      try {
        const items = JSON.parse(session.metadata.items || "[]");
        
        const order = await orderModel.create({
          userId: session.metadata.userId,
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: "" // Không có ảnh
          })),
          amount: session.amount_total / 100,
          address: {},
          paymentMethod: "Stripe",
          paymentStatus: "Paid",
          status: "Order Placed",
          sessionId: session.id,
          customerDetails: {
            email: session.customer_details?.email,
            name: session.customer_details?.name
          }
        });

        console.log("✅ Order saved:", order._id);
      } catch (error) {
        console.error("❌ Failed to save order:", error.message);
      }
      break;
  }

  res.json({ received: true });
});

router.get("/verify/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details']
    });
    
    res.json({
      success: true,
      session: {
        id: session.id,
        amount_total: session.amount_total / 100,
        customer_email: session.customer_details?.email,
        payment_status: session.payment_status,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;