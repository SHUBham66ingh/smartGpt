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



export const sendMessage = async(req , res)=>{

    try{
    const {chatId}  = req.params;
    const{content} = req.body;

     if(!content || content.trim=="")
     {
      return res.status(400).json({
        message : "You didn't send any message"
      })
     }

     const chat = await Chat.findOne({
        _id : chatId,
        userId : req.user._id
     })


     const Usermessage = await Message.create({
          userId : req.user_.id,
          chatId : chatId,
          role : "user",
          content : content,
     })

     const dummyReply = "Mein changs hi"

     const assMessage = await Message.create({
        userId : req.user._id,
        chatId : chatId,
        role : "assistant",
        content : dummyReply,
     })

     res.status(201).json({
        message : dummyReply
     })
    }

     catch(err)
     {
        console.log(err);
        res.status(500).json({
            message : "Internal server error"
        })
     }
}
