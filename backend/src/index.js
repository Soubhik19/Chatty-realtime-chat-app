import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import {connectDB} from './lib/db.js'
import messageRoutes from './routes/message.routes.js'
import { app ,server} from './lib/socket.js'

dotenv.config()

app
// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }));
  
  app.use(express.json({ limit: '50mb' }));  // Adjust limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(express.json());





app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)



server.listen(process.env.PORT || 5001, '0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT || 5001}`);
    connectDB();
});
