import express from 'express';
import db from './db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT =process.env.PORT || 9054;


const app= express();
app.use(cors({
    origin:process.env.CLIENT_URL || 'http://localhost:5173',
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
}))
app.use(cookieParser());
app.use(express.json());

//User Routes
import UserRoutes from './Routes/UserRoutes.js';
app.use('/api/user',UserRoutes);

//Timesheet Routes
import TimesheetRoutes from './Routes/TimesheetRoutes.js';
app.use('/api/timesheet',TimesheetRoutes);

//leave Routes
import LeaveRoutes from './Routes/LeaveRoutes.js';
app.use('/api/leave',LeaveRoutes);



app.listen(PORT,()=>{
    console.log(`Servar is runnig on port ${process.env.PORT}`)
})