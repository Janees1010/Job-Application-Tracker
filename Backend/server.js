const express = require("express")
const app =express()
const dbConnection  = require("./dBConnection/connection")
const userRoutes = require("./routes/userRoutes")
const applicationRoutes = require("./routes/applicationRoutes")
const cors = require("cors")
require("dotenv").config()


dbConnection() 


app.use(cors({
    origin: "http://localhost:5173", 
}))

app.use(express.json())

app.use("/api/users",userRoutes)
app.use("/api/applications",applicationRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server running ON ${process.env.PORT}`);
})                                                                           