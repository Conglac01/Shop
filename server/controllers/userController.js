import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose"; // 👈 THÊM DÒNG NÀY

const cookieOptions = {
  httpOnly: true,
  secure: process.env.APP_ENV === "production",
  sameSite: process.env.APP_ENV === "production" ? "none" : "strict",
};

// ================================
// USER REGISTER
// ================================

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      cartData: {},
      wishlist: [],
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        cartData: user.cartData,
        wishlist: user.wishlist || [],
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// USER LOGIN
// ================================

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        cartData: user.cartData || {},
        wishlist: user.wishlist || [],
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// CHECK AUTH
// ================================

export const isAuth = async (req, res) => {
  try {
    const { userId } = req;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        cartData: user.cartData || {},
        wishlist: user.wishlist || [],
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// SYNC CART
// ================================

export const syncCart = async (req, res) => {
  try {
    const { userId } = req;
    const { cartData } = req.body;

    if (!cartData) {
      return res.json({
        success: false,
        message: "Cart data missing",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(userId, { cartData }, { new: true })
      .select("-password");

    return res.json({
      success: true,
      message: "Cart synced successfully",
      cartData: user.cartData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// CLEAR CART
// ================================

export const clearCart = async (req, res) => {
  try {
    const { userId } = req;

    const user = await userModel
      .findByIdAndUpdate(userId, { cartData: {} }, { new: true })
      .select("-password");

    return res.json({
      success: true,
      message: "Cart cleared",
      cartData: user.cartData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// TOGGLE WISHLIST - ĐÃ SỬA
// ================================

export const toggleWishlist = async (req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.body;

    const user = await userModel.findById(userId);

    let wishlist = user.wishlist || [];

    // 👇 QUAN TRỌNG: Chuyển đổi productId thành ObjectId
    const objectId = new mongoose.Types.ObjectId(productId);

    // Kiểm tra xem ObjectId đã tồn tại chưa
    const exists = wishlist.some(id => id.toString() === objectId.toString());

    if (exists) {
      // Xóa khỏi wishlist
      wishlist = wishlist.filter(id => id.toString() !== objectId.toString());
    } else {
      // Thêm vào wishlist (dưới dạng ObjectId)
      wishlist.push(objectId);
    }

    user.wishlist = wishlist;
    await user.save();

    // Trả về mảng các ObjectId dưới dạng string để frontend dễ xử lý
    const wishlistStrings = wishlist.map(id => id.toString());

    return res.json({
      success: true,
      wishlist: wishlistStrings,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// GET WISHLIST - ĐÃ SỬA
// ================================

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req;

    const user = await userModel
      .findById(userId)
      .populate("wishlist");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Trả về wishlist đã populate đầy đủ thông tin sản phẩm
    return res.json({
      success: true,
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// LOGOUT
// ================================

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};