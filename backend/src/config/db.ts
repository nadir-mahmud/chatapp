import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // In 2026, we don't need deprecated options like useNewUrlParser
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Type casting error as 'Error' to access the message property
    const err = error as Error;
    console.error(`❌ Error: ${err.message}`);

    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
