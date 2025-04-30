import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import {connectDB} from './lib/db.js'

dotenv.config()
const app =express();
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use(cookieParser());
app.get("/ping", (req, res) => {
    res.send("pong");
  });
  


app.listen(process.env.PORT || 5001, '0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT || 5001}`);
    connectDB();
});
