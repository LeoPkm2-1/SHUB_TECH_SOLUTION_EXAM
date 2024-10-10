import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { userInforController } from "./../controllers/userController";
const router = Router();

// router get user file uploaded recently
router.get("/usersInfor", userInforController);

export default router;
