const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const Message = require("../Models/MessageModel");
const Chat = require("../Models/ChatModel");

module.exports.sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("Content Required in Request Body");
  }
  if (!chatId) {
    res.status(400);
    throw new Error("ChatId Required in Request Body");
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    // as message is an instance of Message model for we are using execPopulate , now removed
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports.allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name pic email")
      .populate("chat");

      res.json(messages)
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
