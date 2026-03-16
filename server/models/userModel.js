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
  // WISHLIST
  // =========================
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    }
  ],

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