import express from "express";
import { getMessages } from "../controller/chat.controller.js";
import { verifyJWT } from "../middleware/jwtVerify.js";

const router = express.Router();

router.get("/", verifyJWT, getMessages);

export default router;
