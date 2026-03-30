import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // Lấy token từ cookie hoặc từ header Authorization
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    console.log("🔑 Token source:", req.cookies.token ? "Cookie" : (req.headers.authorization ? "Header" : "None"));
    console.log("🔑 Token received:", token);
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded user ID:", decoded.id);

    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    req.userId = decoded.id;
    next();

  } catch (error) {
    console.log("❌ Auth error:", error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;