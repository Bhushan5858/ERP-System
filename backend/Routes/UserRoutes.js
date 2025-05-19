import express from "express";
import bcrypt from "bcrypt";
import { verifyToken } from "../Middleware/JWT.js";
import { addUser, deleteUser, getAllUsers, getProfile, login, logout, updateUser } from "../Controller/UserController.js";


const router = express.Router();

router.post('/login',login)   //for All
router.get('/getProfile',verifyToken,getProfile)
router.post('/addUser',verifyToken,addUser)  //for Admin
router.get('/getAllUsers',verifyToken,getAllUsers)//for Admin
router.put('/updateUser',verifyToken,updateUser)  //for Admin
router.delete('/deleteUser',verifyToken,deleteUser) //for admin
router.post('/logout',verifyToken,logout)   //For all



export default router;