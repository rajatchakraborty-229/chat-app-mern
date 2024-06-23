import express from "express"
import mongoose from "mongoose"


const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connect to mongo")
    }catch(e){
        console.log("Error connecting to mongodb", e.message)
    }
}

export default connectToMongoDB;