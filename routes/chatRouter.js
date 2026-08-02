import express from "express";
import authUserMiddleware from "../middlewares/authUserMiddleware.js"

const chatRouter =  express.Router();

chatRouter.use(authUserMiddleware);

chatRouter.post("/createChat" , createChat);
chatRouter.get("/getRecentChat" , getRecentChat);
chatRouter.get(":chatId" , getSingleChat);
chatRouter.delet("/:chatId" , deleteChat);

export default chatRouter;







