const  express = require("express");
const dotenv = require("dotenv");
const app =require("./src/app")
const connect = require("./src/Connection/connection");

dotenv.config({path:"./src/configs/config.env"});
app.listen(process.env.PORT,()=>{
    connect()
    console.log(`listen on port ${process.env.PORT}`);
})
