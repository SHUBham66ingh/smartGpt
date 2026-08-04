import express from "express";
import connectDB from "./config/database";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import messageRouter from "./routes/messageRouter";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chatRouter"; 

dotenv.config();

 
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/user" , userRouter);
app.use("/msg" ,messageRouter);
app.use("/chat" , chatRouter);

const startServer = async()=>{
     try{
    await connectDB();
    app.listen(process.env.PORT , ()=>{
        console.log(`Server is listening at ${process.env.PORT} `);
    })
     }
     catch(err)
     {
        console.log(err);
     }
}
startServer();






