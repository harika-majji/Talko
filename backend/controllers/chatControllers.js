const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//create or fetching one-on-one chats
const accessChat = asyncHandler(async (req, res) => {

    const { userId } = req.body;
    if (!userId) {
        res.status(400);
        console.log("UserId param is not send with the request");
    }

    var isChat = Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ],
    }).populate("users", "-password")
        .populate("latestMessage");
    
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });
    if (isChat.length>0) {
        res.send(isChat[0]);
    } else {
        const chatData = {
            "chatName": "Sender",
            "isGroupChat": false,
            "users": [userId, req.user._id],
        };
        try {
            const chat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: chat._id }).populate("users","-password");
            res.status(200).send(FullChat);
            
        } catch (error) {
            res.status(400);
            throw new Error(error.message);    
        }      
    }   
});

//fetch all chats of a user
const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, { path: "latestMessage.sender", select: "name pic email" });
                res.status(200).send(result);
    
                
            });
        
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
    }    
});

//create a Group Chat
const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users && !req.body.chatName) {
        return res.status(400).send({ message: "Please fill all the fields" });

    }
    var { chatName, users } = req.body;
    users = JSON.parse(users);
    if (users.length < 2) {
         return res.status(400).send({ message: "More than two users are required to form a group chat" });
    }
    users.push(req.user._id);
    try {
        const chatData = {
            "chatName": chatName,
            "isGroupChat": true,
            "users": users,
            "groupAdmin": req.user
        };
        const groupChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: groupChat._id }).populate("users","-password");
        res.status(200).send(FullChat);
        
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
        
    }
    
});


// Rename Group Name
const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const group = await Chat.findByIdAndUpdate(
        chatId, {
        chatName,
    },
        { new: true }//to return the updated value
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");
    console.log(`group ${group}`);
    if (!group) {
        res.status(400)
        throw new Error("Chat Not Found");
    } else {
        res.json(group);
    }   

})

const removeFromGroup = asyncHandler(async (req, res) => {
    
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId,
        {
        $pull: { users: userId }
        },
        { new: true }).populate("users", "-password")
        .populate("groupAdmin","-password");

    if (!updatedChat) {
        res.status(400)
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }  
    
});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId,
        {
        $push: { users: userId }
        },
        { new: true}).populate("users", "-password")
        .populate("groupAdmin","-password");;

    if (!updatedChat) {
        res.status(400)
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }  
});

module.exports = { accessChat, fetchChats, createGroupChat,renameGroup, removeFromGroup,addToGroup };