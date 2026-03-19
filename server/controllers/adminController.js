import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("📢 Admin login attempt:", email);

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASS
        ) {
            console.log("❌ Invalid credentials");
            return res.json({ success: false, message: "Invalid Credentials" });
        }

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

        console.log("✅ Admin logged in");
        return res.json({ success: true, message: "Admin Logged in" });

    } catch (error) {
        console.log("❌ Error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

export const adminLogout = async (req, res) => {
    try {
        res.clearCookie("adminToken", cookieOptions);
        return res.json({ success: true, message: "Admin Logged out" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const isAdminAuth = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};