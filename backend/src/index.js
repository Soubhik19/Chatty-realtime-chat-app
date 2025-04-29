import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import {connectDB} from './lib/db.js'

dotenv.config()
const app =express();

app.use("/api/auth",authRoutes)


app.listen(process.env.PORT || 5001,()=>{
    console.log(`server is running on port ${process.env.PORT || 5001}`);
    connectDB();
}) 