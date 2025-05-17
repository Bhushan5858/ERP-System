import express from "express";
import bcrypt from "bcrypt";
import { verifyToken } from "../Middleware/JWT.js";
import { addUser, login, logout } from "../Controller/UserController.js";


const router = express.Router();

router.post('/login',login)
router.post('/addUser',verifyToken,addUser)
router.post('/logout',verifyToken,logout)



export default router;