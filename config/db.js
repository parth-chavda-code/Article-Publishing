import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connection successfully");
    } catch (error) {
        throw new Error("DB Connection Error");
    }
}