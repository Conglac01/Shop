import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {

        const { adminToken } = req.cookies;

        if (!adminToken) {
            return res.json({ success: false, message: "Not Authorized. Login again" });
        }

        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

        // ✅ check email admin từ .env
        if (decoded.email === process.env.ADMIN_EMAIL) {

            req.adminEmail = decoded.email; // sửa chỗ này

            next();

        } else {

            return res.json({ success: false, message: "Not Authorized. Login again" });

        }

    } catch (error) {

        console.log(error.message);

        return res.json({ success: false, message: error.message });

    }
};

export default authAdmin;