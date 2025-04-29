import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const databaseURL = process.env.MONGODB_URL;
        if (!databaseURL) {
            throw new Error("MONGODB_URL is not defined in environment variables.");
        }

        const conn = await mongoose.connect(databaseURL);
        console.log(`MongoDB connected: ${databaseURL}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
