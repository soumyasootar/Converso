const express=require("express")
const { protect } = require("../middlewares/authMiddleware");
const { accessChat, fetchChat, createGroup, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatController");


const chatRoute = express.Router()

chatRoute.post("/",protect,accessChat)
chatRoute.get("/",protect,fetchChat)
chatRoute.post("/group",protect,createGroup)
chatRoute.put("/rename",protect,renameGroup)
chatRoute.put("/removegroup",protect,removeFromGroup)
chatRoute.put("/addgroup",protect,addToGroup)


module.exports=chatRoute;