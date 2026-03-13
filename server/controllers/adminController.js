import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Cookie options for admin
const cookieOptions = {
    httpOnly: true,
    secure: process.env.APP_ENV === "production",
    sameSite: process.env.APP_ENV === "production" ? "none" : "strict"
};

// Admin Login Route = /api/admin/login
export const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // ✅ Check admin credentials from .env (NO DATABASE)
        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASS
        ) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // ✅ Generate JWT token directly
        const token = jwt.sign(
            {
                email: process.env.ADMIN_EMAIL,
                role: "admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("adminToken", token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: "Admin Logged in" });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// Admin Logout Route = /api/admin/logout
export const adminLogout = async (req, res) => {
    try {

        res.clearCookie("adminToken", cookieOptions);

        return res.json({ success: true, message: "Admin Logged out" });

    } catch (error) {

        console.log(error.message);

        return res.json({ success: false, message: error.message });
    }
};

// Check Admin Auth = /api/admin/is-auth
export const isAdminAuth = async (req, res) => {
    try {

        return res.json({ success: true });

    } catch (error) {

        console.log(error.message);

        return res.json({ success: false, message: error.message });
    }
};