import { Request, Response, NextFunction } from "express";
import { UPLOAD_OBJ } from "../models/fileModel";
import { FileUtiles } from "./../utils/fileUtils";
import {
    FILES_LOCATION,
    ERROR_TYPE_FILE_UP_NOT_XLSX_OR_XLS,
    ERROR_TYPE_FILE_UP_NOT_XLSX,
} from "./../utils/config";
export const uploadFileControler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        UPLOAD_OBJ.single("file")(req, res, (err) => {
            if (err) {
                // file's content-type uploaded not allowed
                if (err.message == ERROR_TYPE_FILE_UP_NOT_XLSX) {
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
            let username: string | undefined = req.body.username ?? undefined;
            if (typeof username === "undefined") {
                FileUtiles.deleteFile(`${FILES_LOCATION}/${req.file.filename}`); // delete file if not found its owner
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
    } catch (error) {
        // Handle other errors (e.g., system errors)
        res.status(500).json({
            error: "Internal server error",
        });
    }
};
