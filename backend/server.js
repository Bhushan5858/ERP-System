import express from 'express';
import db from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT =process.envPORT || 9054;

const app= express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello world")
})

//User Routes
import userRoutes from './Routes/UserRoutes.js';
app.use('/api/user',userRoutes);
app.get('/api/user',(req,res)=>{
    res.send("User Routes")
})

app.listen(PORT,()=>{
    console.log(`Servar is runnig on port ${process.env.PORT}`)
})