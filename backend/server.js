const express= require("express")
const cors=require('cors');

const app=express();

const dotenv=require("dotenv");
const connectDB = require("./configs/db");
const userRoute = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");


app.use(express.json())  //to accept JSOn data
app.use(cors())


dotenv.config()

app.get("/",(req,res)=>{
    res.send("Welcome to C O N V E R S O api");
})

app.use("/api/user",userRoute)
app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT 

app.listen(PORT,()=>{
    console.log(`Server is Listening at http://localhost:${PORT}`.blue.bold);
    connectDB()
})