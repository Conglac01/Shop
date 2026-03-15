import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/* PLACE ORDER COD */

export const placeOrderCOD = async (req, res) => {

  try {

    const { userId } = req;

    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully"
    });

  } catch (error) {

    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });

  }

};

/* USER ORDERS */

export const userOrders = async (req, res) => {

  try {

    const { userId } = req;

    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

};

/* ADMIN ORDERS */

export const allOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({});

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

};

/* UPDATE STATUS */

export const updateStatus = async (req, res) => {

  try {

    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

};

/* STRIPE (placeholder) */

export const placeOrderStripe = async (req, res) => {

  res.json({
    success: false,
    message: "Stripe not implemented yet"
  });

};