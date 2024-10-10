import multer from "multer";
import path from "path";
import express from "express";

import {
    FILES_LOCATION,
    ERROR_TYPE_FILE_UP_NOT_XLSX_OR_XLS,
    ERROR_TYPE_FILE_UP_NOT_XLSX,
} from "./../utils/config";
import { FileNameUtils } from "./../utils/fileUtils";

// Configure Multer storage
export const FILE_STORAGE_CONF: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${FILES_LOCATION}/`);
    },
    filename(req, file, callback) {
        const newFileName: string = FileNameUtils.uniqueFileNameGen();
        callback(null, newFileName + path.extname(file.originalname));
    },
});

// File filter to allow only .xlsx and .xls files
const xlsAndXlsxFilter = (
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedMimeTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error(ERROR_TYPE_FILE_UP_NOT_XLSX_OR_XLS)); // Reject the file
    }
};

// File filter to restrict uploads to .xlsx files only
const xlsxOnlyFilter = (
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedMimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // .xlsx

    // Check the file's MIME type
    if (file.mimetype === allowedMimeType) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error(ERROR_TYPE_FILE_UP_NOT_XLSX)); // Reject the file
    }
};

// setup upload object
export const UPLOAD_OBJ = multer({
    storage: FILE_STORAGE_CONF,
    fileFilter: xlsxOnlyFilter,
});
