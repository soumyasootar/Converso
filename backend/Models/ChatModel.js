const { default: mongoose, Mongoose } = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Mongoose.Schema.type.ObjectId, ref: "User" }],
    latestMessage: { type: Mongoose.Schema.type.ObjectId, ref: "Message" },
    groupAdmin: { type: Mongoose.Schema.type.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = Mongoose.model("Chat",chatModel);

module.exports=Chat
