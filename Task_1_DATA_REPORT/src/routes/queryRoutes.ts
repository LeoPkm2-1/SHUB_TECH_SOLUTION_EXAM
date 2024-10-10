import { Router, Request, Response, NextFunction } from "express";
import { queryRevenueMid } from "../middleware/middleQuery";

const router = Router();

// query data router
router.post(
    "/queryRevenue",
    queryRevenueMid(),
    (req: Request, res: Response, next: NextFunction) => {
       res.send("Query ahihi ok");
    }
);

export default router;
