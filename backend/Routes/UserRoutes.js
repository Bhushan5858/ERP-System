import express from 'express';
import { addUser, login } from '../Controller/UserController.js';
import { verifyToken } from '../Middleware/JWT.js';

const router = express.Router();

router.post('/addUser',verifyToken, addUser);    //admin only
router.post('/login', login);        // All users



export default router;