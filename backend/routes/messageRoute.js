const express=require("express")
const { protect } = require("../middlewares/authMiddleware");
const { sendMessage, allMessages } = require("../controllers/messageController");



const messageRoute = express.Router()

messageRoute.post("/",protect,sendMessage)
messageRoute.get("/:chatId",protect,allMessages)


module.exports=messageRoute;