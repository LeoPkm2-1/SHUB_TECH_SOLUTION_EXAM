"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleQuery_1 = require("../middleware/middleQuery");
const queryController_1 = require("../controllers/queryController");
const router = (0, express_1.Router)();
// router to query Revenue from startTime to endTime
router.post("/queryRevenue", (0, middleQuery_1.queryRevenueMid)(), queryController_1.queryHandleController);
exports.default = router;
