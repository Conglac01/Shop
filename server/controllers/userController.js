import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.APP_ENV === "production",
    sameSite: process.env.APP_ENV === "production" ? "none" : "strict"
};

// User Register Route
export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cartData: {} // Giỏ hàng rỗng khi tạo user
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ 
            success: true, 
            user: { 
                email: user.email, 
                name: user.name,
                cartData: user.cartData 
            } 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// User Login Route
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Trả về cả cartData khi login
        return res.json({ 
            success: true, 
            user: { 
                email: user.email, 
                name: user.name,
                cartData: user.cartData 
            } 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Check Auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId).select("-password");
        
        // Trả về cả cartData khi kiểm tra auth
        return res.json({ 
            success: true, 
            user: {
                email: user.email,
                name: user.name,
                cartData: user.cartData
            }
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// 👇 THÊM API ĐỒNG BỘ GIỎ HÀNG
export const syncCart = async (req, res) => {
    try {
        const { userId } = req;
        const { cartData } = req.body;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { cartData },
            { new: true }
        ).select("-password");

        return res.json({ 
            success: true, 
            message: "Cart synced successfully",
            cartData: user.cartData 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOptions);
        return res.json({ success: true, message: "Successfully Logged out" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};