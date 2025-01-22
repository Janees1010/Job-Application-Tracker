const mongoose   = require("mongoose")
require("dotenv").config()


const dbConnection = async()=>{
 try {
    const response  = await mongoose.connect(process.env.DB_URL)
    console.log("database connected");
 } catch (error) {
    console.log(error.message);
 }
}

module.exports = dbConnection    