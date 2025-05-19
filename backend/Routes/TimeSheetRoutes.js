import express from "express";
import { verifyToken } from "../Middleware/JWT.js";
import { clockIn, clockOut, getAttendance, getTimeSheetAtDate, presentAtDate} from "../Controller/TimesheetController.js";

const router = express.Router();
// Route to clock in
router.post('/clockIn', verifyToken, clockIn); //For Developer
router.post('/clockOut', verifyToken, clockOut); //for Developer
router.get('/getAttendance', verifyToken, getAttendance);  //for Developer
//use same function for TimeSheet for developer for get Time Sheet
router.get('/getTimeSheet', verifyToken, getAttendance);  //For developer
//use same api for todayPresent and present at date for admin or manger
router.get('/presentToday',verifyToken,presentAtDate);   // For Manger or admin
router.get ('/getTimeSheetAtdate',verifyToken,getTimeSheetAtDate); //for admin or manager


export default router;