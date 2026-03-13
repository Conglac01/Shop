import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }

        req.userId = decoded.id;

        next();

    } catch (error) {

        console.log(error.message);

        return res.status(401).json({ success: false, message: error.message });

    }
};

export default authUser;