import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import express from 'express';
import authRoutes from './src/routes/Auth.Routes.js';

dotenv.config();
const app = express();


//middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("mongodb connected successfully"))
.catch((error) => console.log("Connection failed due to : ", error));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));