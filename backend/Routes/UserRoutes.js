import express from 'express';
import { addUser, login } from '../Controller/UserController.js';

const router = express.Router();

router.post('/addUser', addUser);
router.post('/login', login);



export default router;