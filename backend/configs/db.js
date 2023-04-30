const mongoose =require("mongoose")
const colours = require("colours")

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_ATLAS_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log(`MongoDB Atlas Connected ${conn.connection.host}`.rainbow);
        
    } catch (error) {
        console.log(`ERROR: ${error}`.red.italic);
        process.exit()
    }
}

module.exports=connectDB