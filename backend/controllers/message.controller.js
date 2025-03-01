import Conversation from "../models/coverstation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save();
        // await newMessage.save()

        await Promise.all([conversation.save(),newMessage.save()]);
        // console.log("sendmmmmmmmmmmmmmm route hit. Conversation:", conversation);
        const receiverSocketId=getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        
        res.status(201).json(newMessage)

    } catch (error) {
        // console.log("error in message_controller", error.message);
        res.status(500).json({ error: "Internal server errror" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate("messages");

        // console.log("getMessages route hit. Conversation:", conversation);

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        // console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
