"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_OBJ = exports.FILE_STORAGE_CONF = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./../utils/config");
const fileUtils_1 = require("./../utils/fileUtils");
// Configure Multer storage
exports.FILE_STORAGE_CONF = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${config_1.FILES_LOCATION}/`);
    },
    filename(req, file, callback) {
        const newFileName = fileUtils_1.FileNameUtils.uniqueFileNameGen();
        callback(null, newFileName + path_1.default.extname(file.originalname));
    },
});
// File filter to allow only .xlsx and .xls files
const xlsAndXlsxFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error(config_1.ERROR_TYPE_FILE_UP_NOT_XLSX_OR_XLS)); // Reject the file
    }
};
// File filter to restrict uploads to .xlsx files only
const xlsxOnlyFilter = (req, file, cb) => {
    const allowedMimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // .xlsx
    // Check the file's MIME type
    if (file.mimetype === allowedMimeType) {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error(config_1.ERROR_TYPE_FILE_UP_NOT_XLSX)); // Reject the file
    }
};
// setup upload object
exports.UPLOAD_OBJ = (0, multer_1.default)({
    storage: exports.FILE_STORAGE_CONF,
    fileFilter: xlsxOnlyFilter,
});
