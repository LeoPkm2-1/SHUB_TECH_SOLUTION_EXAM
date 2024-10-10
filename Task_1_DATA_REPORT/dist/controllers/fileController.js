"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileControler = void 0;
const fileModel_1 = require("../models/fileModel");
const fileUtils_1 = require("./../utils/fileUtils");
const config_1 = require("./../utils/config");
// upload file handler
const uploadFileControler = (req, res, next) => {
    try {
        fileModel_1.UPLOAD_OBJ.single("file")(req, res, (err) => {
            var _a;
            if (err) {
                // file's content-type uploaded not allowed
                if (err.message == config_1.ERROR_TYPE_FILE_UP_NOT_XLSX) {
                    return res.status(400).json({
                        error: "File upload failed",
                        details: err.message,
                    });
                }
                // upload file error
                return res.status(500).json({
                    error: "File upload failed",
                    details: err.message,
                });
            }
            if (!req.file) {
                // no file upload
                return res.status(400).json({ error: "No file uploaded." });
            }
            let username = (_a = req.body.username) !== null && _a !== void 0 ? _a : undefined;
            if (typeof username === "undefined") {
                fileUtils_1.FileUtiles.deleteFile(`${config_1.FILES_LOCATION}/${req.file.filename}`); // delete file if not found its owner
                return res
                    .status(400)
                    .json({ error: "Not found username value" });
            }
            next();
            // Successful file upload
            res.status(200).json({
                message: "File uploaded successfully",
                // filePath: req.file.path,
                // filePath: req.file.filename,
            });
        });
    }
    catch (error) {
        // Handle other errors (e.g., system errors)
        res.status(500).json({
            error: "Internal server error",
        });
    }
};
exports.uploadFileControler = uploadFileControler;
