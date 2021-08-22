import express from "express";
import { sendMessage, getAllMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/sendmessage", sendMessage);
router.post("/getallmessages", getAllMessages);

export default router;
