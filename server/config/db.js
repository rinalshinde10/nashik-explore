import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

export default connectDB;