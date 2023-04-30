const express=require("express")

const { registerUser, authUser, allUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");


const userRoute = express.Router()

userRoute.post("/",registerUser)
userRoute.get("/",allUsers)
userRoute.post("/login",protect,authUser)


module.exports=userRoute;
