import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { userInforController } from "./../controllers/userController";
const router = Router();

// router.post("/usersInfor", userInforController);
router.get("/usersInfor", userInforController);

export default router;
