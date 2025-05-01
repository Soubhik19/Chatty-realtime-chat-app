import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersfromSidebar,sendMessage} from '../controllers/message.controllers.js';


router.get("/users",protectRoute,getUsersfromSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send:id",protectRoute,sendMessage);



export default router;