import express from "express";
import { getNotes,addNotes } from "../controller/notes.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/jwtVerify.js";

const router = express.Router();

router.route("/:semester/:branch").get(getNotes);

router.route("/addnotes").post(verifyJWT,upload.fields([
    {
        name:"notes",
        maxCount:1,
    }

]),addNotes);

export default router;