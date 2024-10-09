import { Router } from "express";
import multer from "multer";
import { uploadFileControler } from "./../controllers/fileController";
import { userUpFileController } from "./../controllers/userController";
const router = Router();

// Upload endpoint
router.post("/upload", uploadFileControler, userUpFileController);
export default router;
