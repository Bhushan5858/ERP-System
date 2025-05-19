import express from "express";
import { verifyToken } from "../Middleware/JWT.js";
import { applyLeave, approveLeave, getAllPendingLeaves, getMyLeaves, rejectLeave} from "../Controller/LeaveController.js";

const router = express.Router();

router.post('/applyLeave',verifyToken,applyLeave)   //for developer
router.get('/getMyLeaves',verifyToken,getMyLeaves)  //for developer
router.get('/getAllPendingLeaves',verifyToken,getAllPendingLeaves)  //for admin or manager
router.post('/approveLeave',verifyToken,approveLeave)  //for admin or manager
router.post('/rejectLeave',verifyToken,rejectLeave)  //for admin or manager


export default router;