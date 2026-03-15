import mongoose from "mongoose";

const connectDB = async () => {

  try {

    console.log("Mongo URI:", process.env.MONGO_URI)

    await mongoose.connect(process.env.MONGO_URI)

    console.log("✓ Database Connected")

    console.log("Database name:", mongoose.connection.name)

  } catch (error) {

    console.log("DB Error:", error)

  }

}

export default connectDB