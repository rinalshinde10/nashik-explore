import dns from "dns";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB connected successfully!");

    await mongoose.disconnect();
} catch (error) {
    console.log("MongoDB connection failed:");
    console.log(error.message);
}   