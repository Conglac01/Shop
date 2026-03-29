import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✓ Database Connected");
    console.log("Database name:", mongoose.connection.name);

  } catch (error) {
    console.log("✗ Database connection failed:", error.message);
    throw error; // ❗ QUAN TRỌNG: không retry ngầm nữa
  }
};

export default connectDB;