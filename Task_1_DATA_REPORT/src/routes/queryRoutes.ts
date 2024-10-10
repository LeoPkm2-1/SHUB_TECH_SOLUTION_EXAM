import { Router, Request, Response, NextFunction } from "express";
import { queryRevenueMid } from "../middleware/middleQuery";
import { queryHandleController } from "../controllers/queryController";

const router = Router();

// query data router
router.post("/queryRevenue", queryRevenueMid(), queryHandleController);

export default router;
