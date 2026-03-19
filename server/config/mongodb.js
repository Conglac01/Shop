import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // ❌ XÓA dòng này ngay!
    // console.log("Mongo URI:", process.env.MONGO_URI)

    await mongoose.connect(process.env.MONGO_URI);

    // ✅ Chỉ log tên database
    console.log("✓ Database Connected");
    console.log("Database name:", mongoose.connection.name);

  } catch (error) {
    // ❌ Không log chi tiết lỗi
    console.log("✗ Database connection failed");
    console.log("Error:", error.message.split(' ')[0] + '...');
  }
};

export default connectDB;