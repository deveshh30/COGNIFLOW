import { LoginUser, RegisterUser } from '../controllers/Auth.Controller.js';
import express from 'express';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);

export default router;