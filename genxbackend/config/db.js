import mongoose from "mongoose";
import dotenv from "dotenv";

const MONGO_URI = process.env.MONGO_URI;
export const connectDB = async () => {
    try {
     const response = await mongoose.connect(`mongodb+srv://ecommercegenx:${process.env.db_password}@cluster0.wb0if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to Mongodb successfully");
      
    } catch (error) {
        console.log(error);
    }
};
