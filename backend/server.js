const express= require("express")

const app=express();

const dotenv=require("dotenv")

dotenv.config()

app.get("/",(req,res)=>{
    res.send("hi");
})

const PORT=process.env.PORT 

app.listen(PORT,()=>{
    console.log(`Server is Listening at http://localhost:${PORT}`);
})