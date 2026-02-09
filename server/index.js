import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import express from 'express';
import authRoutes from './src/routes/Auth.Routes.js';
import GoalRoutes from "./src/routes/Goal.routes.js";

dotenv.config();
const app = express();


//middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/api/auth', authRoutes);
app.use('/api/goals' , GoalRoutes);

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        data: null,
        errors: err?.error || err?.errors || null,
    });
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DB || undefined,
            serverSelectionTimeoutMS: 10000,
        });
        console.log("mongodb connected successfully");
    } catch (error) {
        console.error("Connection failed due to:", error?.message || error);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));