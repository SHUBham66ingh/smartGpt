import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";



export const getMessage = async(req , res)=>{
     try{

        const {chatId} = req.params;

        const chat = await Chat.findOne({
            _id: chatId,
            userId: req.user._id
     })

     if(!chat)
     {
       return res.status(200).json({
            message : "Chat not founded"
        })
     }

     const message = await Message.find({
          chatId : chatId,
     }).sort({createdAt:1});

     res.status(200).json({
        message : "Message send successfully",
        msg: messages
     })
     }
     catch(err)
     {
        console.log(err);
        res.status(404).json({
            message : "Internal server error"
        })
     }
}
