import express from 'express';
import { verifyToken } from '../Middleware/JWT.js';
import { clockIn, clockOut, getAttendanceRecord, getTodayAttendance } from '../Controller/AttendanceController.js';


const router = express.Router();

router.post('/clockIn',verifyToken,clockIn); //develper and manager
router.post('/clockOut',verifyToken,clockOut); //develper and manager
router.get('/getAttendanceRecord',verifyToken,getAttendanceRecord); //develper and manager
router.get('/getTodayAttendance',verifyToken,getTodayAttendance); //admin and manager


export default router;

