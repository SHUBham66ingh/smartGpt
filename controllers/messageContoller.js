import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";

export const getMessage = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(200).json({
        message: "Chat not founded",
      });
    }

    const message = await Message.find({
      chatId: chatId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      message: "Message send successfully",
      msg: messages,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content , model } = req.body;

    if (!content || content.trim == "") {
      return res.status(400).json({
        message: "You didn't send any message",
      });
    }
     let chat;

    // existing chat case
    if(chatId)
    {
       if(!mongoose.Types.ObjectId.isValid(chatId))
       {
         return res.status(404).json({
          message : "Invalid chat Id"
         })
       }
       chat = await Chat.findOne({
        _id : chatId,
        userId : req.user_.id
       })

       if(!chat)
       {
         return res.status(404).json({
          message : "Chat not founded"
         })
       }
    }

     else{
      if(!model)
      {
         return res.status(400).json({
          message : "Model is required for new chat"
         })
      }

      chat  = await Chat.create({
        userId : req.user._id,
        model,
        topic : content.trim().slice(0 , 40)
      })
     }


     const userMessage = await Message.create({
      chatId : chat._id,
      role : "user" ,
      content : content.trim()
     })


     const aiReply = "Ai reply willl come here later";

     const assitanntMessage = await Message.create({
      chatId : chat._id,
      role : "assistant",
      content : aiReply
     })

     chat.messageCount +=2;

     if(chat.topic==="New Chat")
     {
      chat.topic = content.trim().slice(0 , 40);
     }

     await chat.save();
    res.status(201).json({
      message: "Message sent successfully",
      chatId: chat._id,
      userMessage,
      assistantMessage
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
