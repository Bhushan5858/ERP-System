import express from "express";
import { verifyToken } from "../Middleware/JWT.js";
import { clockIn, clockOut, getAttendance } from "../Controller/TimesheetController.js";

const router = express.Router();
// Route to clock in
router.post('/clockIn', verifyToken, clockIn);
router.post('/clockOut', verifyToken, clockOut);
router.get('/getAttendance', verifyToken, getAttendance);
//use same api for get Time Sheet
router.get('/getTimeSheet', verifyToken, getAttendance);

export default router;