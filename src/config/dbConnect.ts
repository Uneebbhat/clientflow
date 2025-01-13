import mongoose from "mongoose";
import { MONGODB_URI } from "@/config/constants";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error occured: ${error}`);
  }
};

export default dbConnect;
