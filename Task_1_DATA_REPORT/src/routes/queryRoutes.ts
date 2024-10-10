import { Router, Request, Response, NextFunction } from "express";
import { queryRevenueMid } from "../middleware/middleQuery";
import { queryHandleController } from "../controllers/queryController";

const router = Router();

// router to query Revenue from startTime to endTime
router.post("/queryRevenue", queryRevenueMid(), queryHandleController);

export default router;
