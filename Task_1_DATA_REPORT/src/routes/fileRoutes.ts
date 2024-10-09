import { Router } from "express";
import multer from "multer";
import { uploadFileControler } from "./../controllers/fileController";
const router = Router();

// Upload endpoint
router.post("/upload", uploadFileControler);
export default router;
