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
exports.userInforController = exports.userUpFileController = void 0;
const userModel_1 = require("../models/userModel");
const fileUtils_1 = require("../utils/fileUtils");
const config_1 = require("../utils/config");
// upload file handler
const userUpFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const newFileName = req.file.filename;
    const userModel = new userModel_1.UserModel();
    const isExisted = yield userModel.isUserExisted(username);
    console.log("\n\ninsert file" + newFileName);
    console.log("username", username);
    if (isExisted) {
        // user has upload file before
        console.log("user _ exist");
        let oldFilename = yield userModel.getFilenameByUsername(username);
        if (typeof oldFilename == "string") {
            // reupload new file
            userModel.updateFileNameOfUser(username, newFileName);
            // delete old file when not use
            fileUtils_1.FileUtiles.deleteFile(`${config_1.FILES_LOCATION}/${oldFilename}`);
        }
    }
    else {
        // new user
        console.log("create entry");
        userModel.insertDataIntoUserFileTable(username, newFileName);
    }
});
exports.userUpFileController = userUpFileController;
// get user infor handler
const userInforController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.method.toUpperCase() != "GET") {
        res.status(400).send("Method is not valid");
        return;
    }
    let username = (_a = req.query.username) !== null && _a !== void 0 ? _a : undefined;
    if (typeof username == "undefined") {
        res.status(400).send("Not get username");
        return;
    }
    const userModel = new userModel_1.UserModel();
    const userFileName = yield userModel.getFilenameByUsername(username);
    if (typeof userFileName == "undefined") {
        res.status(200).send("User doest not have file");
        return;
    }
    res.status(200).json({
        msg: "Query success",
        fileName: userFileName,
    });
});
exports.userInforController = userInforController;
