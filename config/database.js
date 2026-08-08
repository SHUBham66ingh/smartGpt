import mongoose from "mongoose";

import dotenv from "dotenv";



const connectDB = async()=>{
    
    await mongoose.connect(process.env.MONGO_URL);
       console.log("connected to database successfully");
 }

export default connectDB; 