import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.APP_ENV === "production",
    sameSite: process.env.APP_ENV ==="production" ? "none" : "strict"
}

// User Register Route
export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if user is already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // hash user password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cartData: {}
        });

        const user = await newUser.save();
        
        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time
       })
        return res.json({ success: true, user: { email: user.email, name: user.name } });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "error.message " });
        
    }
};

//User Login Route =api/user/login
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
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time (7 days)
        });

        return res.json({ success: true, user: { email: user.email, name: user.name } });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Check Auth = /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId).select("-password");
        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Logout User = /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOptions);
        return res.json({ success: true, message: "Successfully Logged out" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
