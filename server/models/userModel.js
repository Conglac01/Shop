import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: { 
    type: String, 
    required: true,
    trim: true
  },

  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: { 
    type: String, 
    required: true 
  },

  // =========================
  // CART DATA
  // =========================
  cartData: {
    type: Object,
    default: {}
  },

  // =========================
  // WISHLIST - ĐÃ SỬA ĐỂ NHẬN CẢ STRING VÀ OBJECTID
  // =========================
  wishlist: {
    type: [mongoose.Schema.Types.Mixed], // ✅ Cho phép cả ObjectId và string
    default: []
  },

  // =========================
  // ORDER HISTORY
  // =========================
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order"
    }
  ],

  // =========================
  // USER ROLE
  // =========================
  isAdmin: { 
    type: Boolean, 
    default: false 
  },

  // =========================
  // USER STATUS
  // =========================
  isBlocked: { 
    type: Boolean, 
    default: false 
  }

},
{ 
  minimize: false,
  timestamps: true
}
);

// =========================
// MODEL
// =========================

const userModel =
mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;