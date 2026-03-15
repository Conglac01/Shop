import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

export const getDashboardData = async (req, res) => {

  try {

    const users = await userModel.countDocuments();
    const products = await productModel.countDocuments();
    const orders = await orderModel.countDocuments();

    const orderData = await orderModel.find({});

    let revenue = 0;

    orderData.forEach(order => {
      revenue += order.amount;
    });

    res.json({
      success: true,
      dashboardData: {
        users,
        products,
        orders,
        revenue
      }
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

};