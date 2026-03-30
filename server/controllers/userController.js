import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// ✅ CẤU HÌNH COOKIE THEO MÔI TRƯỜNG
const isProduction = process.env.APP_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,                    // ✅ true trên production, false trên dev
  sameSite: isProduction ? "none" : "lax", // ✅ none trên production, lax trên dev
  maxAge: 7 * 24 * 60 * 60 * 1000
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

    console.log("🔐 [REGISTER] Token generated:", token);
    console.log("🍪 [REGISTER] Setting cookie with options:", cookieOptions);

    res.cookie("token", token, cookieOptions);

    console.log("✅ [REGISTER] Cookie set successfully");

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
    console.log("❌ [REGISTER] Error:", error.message);
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

    console.log("🔐 [LOGIN] Token generated:", token);
    console.log("🍪 [LOGIN] Setting cookie with options:", cookieOptions);

    res.cookie("token", token, cookieOptions);

    console.log("✅ [LOGIN] Cookie set successfully");

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
    console.log("❌ [LOGIN] Error:", error.message);
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
// TOGGLE WISHLIST
// ================================

export const toggleWishlist = async (req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.body;

    const user = await userModel.findById(userId);
    let wishlist = user.wishlist || [];

    const exists = wishlist.some(id => id.toString() === productId.toString());

    if (exists) {
      wishlist = wishlist.filter(id => id.toString() !== productId.toString());
    } else {
      wishlist.push(productId);
    }

    user.wishlist = wishlist;
    await user.save();

    return res.json({
      success: true,
      wishlist: wishlist,
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
// GET WISHLIST
// ================================

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const wishlist = user.wishlist || [];
    
    const objectIds = wishlist.filter(id => 
      mongoose.Types.ObjectId.isValid(id)
    );
    
    const stringIds = wishlist.filter(id => 
      !mongoose.Types.ObjectId.isValid(id)
    );

    let products = [];
    if (objectIds.length > 0) {
      const Product = mongoose.model('product');
      products = await Product.find({ _id: { $in: objectIds } });
    }

    const result = [
      ...products,
      ...stringIds.map(id => ({ _id: id, isDummy: true }))
    ];

    return res.json({
      success: true,
      wishlist: result,
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