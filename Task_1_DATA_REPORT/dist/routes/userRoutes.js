"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./../controllers/userController");
const router = (0, express_1.Router)();
// router get user file uploaded recently
router.get("/usersInfor", userController_1.userInforController);
exports.default = router;
