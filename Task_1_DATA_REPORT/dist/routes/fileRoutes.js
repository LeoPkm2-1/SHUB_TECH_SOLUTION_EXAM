"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("./../controllers/fileController");
const userController_1 = require("./../controllers/userController");
const router = (0, express_1.Router)();
// Upload endpoint
router.post("/upload", fileController_1.uploadFileControler, userController_1.userUpFileController);
exports.default = router;
