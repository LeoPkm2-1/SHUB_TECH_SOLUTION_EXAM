"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRevenueMid = exports.timeValidMid = exports.fileExistMid = exports.userExistMid = void 0;
const userModel_1 = require("../models/userModel");
const timeUtils_1 = require("../utils/timeUtils");
//  user exist Handle Middleware
const userExistMid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const username = (_a = req.body.username) !== null && _a !== void 0 ? _a : undefined;
    if (typeof username == "undefined") {
        res.status(400).json({
            error: "username not found!",
        });
        return;
    }
    const usermodel = new userModel_1.UserModel();
    let isExisted = yield usermodel.isUserExisted(username);
    if (!isExisted) {
        res.status(400).json({
            error: "username not found!",
        });
        return;
    }
    const dataToHandle = {
        username: username,
        filename: undefined,
        startTime: "",
        endTime: "",
    };
    req.body.queryRevenueData = dataToHandle;
    next();
});
exports.userExistMid = userExistMid;
// file exist Handle Middleware
const fileExistMid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.queryRevenueData.username;
    const usermodel = new userModel_1.UserModel();
    const fileNameOfUser = yield usermodel.getFilenameByUsername(username);
    if (typeof fileNameOfUser == "undefined") {
        res.status(400).json({
            error: "Not found file!",
        });
        return;
    }
    req.body.queryRevenueData.filename = fileNameOfUser;
    next();
});
exports.fileExistMid = fileExistMid;
// time handle Middleware
const timeValidMid = (req, res, next) => {
    try {
        const { startTime, endTime } = req.body;
        if (!startTime || !endTime) {
            res.status(400).json({
                error: "Please provide both startTime and endTime",
            });
            return;
        }
        if (typeof startTime != "string" || typeof endTime != "string") {
            res.status(400).json({
                error: "Format time error. Time format is string 'HH:mm:ss'",
            });
            return;
        }
        if (!timeUtils_1.TimeUtils.checkTimeValidFormat(startTime) ||
            !timeUtils_1.TimeUtils.checkTimeValidFormat(endTime)) {
            res.status(400).json({
                error: "Format time error. Time format is string 'HH:mm:ss'",
            });
            return;
        }
        if (!timeUtils_1.TimeUtils.isStartTimeEarlierThanEndTime(startTime, endTime)) {
            res.status(400).json({
                error: "startTime must be earlier than endTime ",
            });
            return;
        }
        req.body.queryRevenueData.startTime = startTime.split(" ").join("");
        req.body.queryRevenueData.endTime = endTime.split(" ").join("");
        next();
    }
    catch (error) {
        res.status(400).json({
            error: "Time query error",
        });
        return;
    }
};
exports.timeValidMid = timeValidMid;
// list of middlewares to pre-process query revenue
const queryRevenueMid = () => [exports.userExistMid, exports.fileExistMid, exports.timeValidMid];
exports.queryRevenueMid = queryRevenueMid;
