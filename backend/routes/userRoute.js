const express=require("express")

const { registerUser, authUser, allUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");


const userRoute = express.Router()

userRoute.post("/",registerUser)
userRoute.get("/",protect,allUsers)
userRoute.post("/login",authUser)


module.exports=userRoute;
