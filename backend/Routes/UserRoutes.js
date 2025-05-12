import express from 'express';
import { signup } from '../Controller/UserController.js';

const router = express.Router();

router.post('/addUser', signup);



export default router;