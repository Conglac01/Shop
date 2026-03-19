import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/users", authAdmin, async (req, res) => {
  try {
    console.log("📢 Admin fetching users...");
    
    const users = await User.find({}).select("-password");
    console.log(`✅ Found ${users.length} users`);
    
    res.json({ success: true, users });
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/user/:id", authAdmin, async (req, res) => {
  try {
    console.log("🗑️ Deleting user:", req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/block/:id", authAdmin, async (req, res) => {
  try {
    console.log("🔒 Blocking/Unblocking user:", req.params.id);
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ 
      success: true, 
      message: user.isBlocked ? "User blocked" : "User unblocked" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;