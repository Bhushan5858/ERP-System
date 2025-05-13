import express from 'express';
import { addUser, deleteUser, getAllUsers, getOtherProfile, getProfile, login, updateUser } from '../Controller/UserController.js';
import { verifyToken } from '../Middleware/JWT.js';

const router = express.Router();

router.post('/addUser',verifyToken, addUser);    //admin only
router.post('/login', login);        // All users
router.get('/getAllUsers',verifyToken,getAllUsers);  //only Admin
router.get('/getProfile',verifyToken,getProfile); // All users
router.get('/getOtherProfile',verifyToken,getOtherProfile); //only Admin and Manager
router.get('/updateUser',verifyToken,updateUser ); //only Admin
router.get('/deleteUser',verifyToken,deleteUser); //only Admin

export default router;