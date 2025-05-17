import express from "express";
import { verifyToken } from "../Middleware/JWT.js";
import { applyLeave, getLeave } from "../Controller/LeaveController.js";

const router = express.Router();

router.post('/applyLeave',verifyToken,applyLeave)
router.get('/getLeave',verifyToken,getLeave)


export default router;