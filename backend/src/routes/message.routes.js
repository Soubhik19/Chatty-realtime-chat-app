import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/authMiddleware.js';
import { getMessages, getUsersfromSidebar } from '../controllers/message.controller.js';


router.get("users",protectRoute,getUsersfromSidebar);
router.get("/: id", protectRoute, getMessages);

router.post("/send:id",protectRoute,sendMessage);



export default router;