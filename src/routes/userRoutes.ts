import express from "express";
import { signup, login } from "../controller/userController";
import upload from "../middleware/upload"; // multer config if using images

const router = express.Router();

router.post("/signup", upload.single("userImage"), signup);
router.post("/login", login);

export default router;
