import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const LOCAL_MONGODB_URL = process.env.LOCAL_DB_URI;

mongoose.connect(LOCAL_MONGODB_URL);

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("mongodb connected");
})
db.on("disconnected",()=>{
    console.log("mongodb disconnected");
})
db.on("error",()=>{
    console.log("mongodb connection error");
})

export default db;