import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";
import mongoose from "mongoose";

export const getMessage = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not founded",
      });
    }

    const message = await Message.find({
      chatId: chatId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      message: "Message send successfully",
      msg: message
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
    const { content, model } = req.body;

    // Validate message
    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "You didn't send any message",
      });
    }

    let chat;

    // Existing chat
    if (chatId) {
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({
          message: "Invalid chat Id",
        });
      }

      chat = await Chat.findOne({
        _id: chatId,
        userId: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }
    }

    // New chat
    else {
      if (!model) {
        return res.status(400).json({
          message: "Model is required for new chat",
        });
      }

      chat = await Chat.create({
        userId: req.user._id,
        model,
        topic: content.trim().slice(0, 40),
      });
    }

    // Create user message
    const userMessage = await Message.create({
      chatId: chat._id,
      role: "user",
      content: content.trim(),
      userId: req.user._id,
      model: chat.model,
    });

    // Temporary AI response
    const aiReply = "AI reply will come here later";

    // Create assistant message
    const assistantMessage = await Message.create({
      chatId: chat._id,
      role: "assistant",
      content: aiReply,
      userId: req.user._id,
      model: chat.model,
    });

    // Update message count
    chat.messageCount += 2;

    // Update topic if needed
    if (chat.topic === "New Chat") {
      chat.topic = content.trim().slice(0, 40);
    }

    await chat.save();

    res.status(201).json({
      message: "Message sent successfully",
      chatId: chat._id,
      userMessage,
      assistantMessage,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};




