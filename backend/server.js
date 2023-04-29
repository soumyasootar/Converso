const express= require("express")

const app=express();

const dotenv=require("dotenv");
const connectDB = require("./configs/db");

dotenv.config()

app.get("/",(req,res)=>{
    res.send("Welcome to C O N V E R S O api");
})

// app.use("/api/user",)

const PORT=process.env.PORT 

app.listen(PORT,()=>{
    console.log(`Server is Listening at http://localhost:${PORT}`.blue.bold);
    connectDB()
})