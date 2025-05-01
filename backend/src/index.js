import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import {connectDB} from './lib/db.js'
import messageRoutes from './routes/message.routes.js'

dotenv.config()

const app =express();
// Middleware
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));



app.listen(process.env.PORT || 5001, '0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT || 5001}`);
    connectDB();
});
