const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const generateToken = require("../configs/generateToken");
const Chat = require("../Models/ChatModel");

// for creating 1-1 chats
module.exports.accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("UserId Not Exist in Body");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, //current logged In User
      { users: { $elemMatch: { $eq: userId } } }, //id of reciever user
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  /* This code is using the Mongoose `populate()` method to populate the `latestMessage.sender` field of
the `isChat` object with the corresponding user data. */
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]); // if chat exists we are gonna send the chat 
  } else {     // else create a new chat
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

module.exports.fetchChat = asyncHandler(async (req, res) => {});

module.exports.createGroup = asyncHandler(async (req, res) => {});

module.exports.renameGroup = asyncHandler(async (req, res) => {});

module.exports.removeFromGroup = asyncHandler(async (req, res) => {});

module.exports.addToGroup = asyncHandler(async (req, res) => {});
