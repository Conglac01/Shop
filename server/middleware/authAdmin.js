import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        console.log("🔐 AuthAdmin middleware called");
        
        const { adminToken } = req.cookies;

        if (!adminToken) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
        }

        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

        if (decoded.email === process.env.ADMIN_EMAIL) {
            req.adminEmail = decoded.email;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
        }

    } catch (error) {
        console.log("❌ Auth error:", error.message);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authAdmin;