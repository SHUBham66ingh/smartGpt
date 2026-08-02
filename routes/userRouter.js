import express from "express";
import {login , signup , profile , logout } from "../controllers/userController";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";

const userRouter = express.Router();


userRouter.post("/login" , login);
userRouter.post("logout" , logOut);
userRouter.post("/signup" , signup);
userRouter.get("/profile" ,authUserMiddleware, profile);

export default userRouter;


