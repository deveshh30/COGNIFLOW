import express from 'express';

const router = express.Router();
import { RegisterUser } from '../controllers/Auth.Controller.js';

router.post('/register', RegisterUser);


export default router;