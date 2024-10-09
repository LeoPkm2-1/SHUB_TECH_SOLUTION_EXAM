import { Request, Response } from "express";
import { UPLOAD_OBJ } from "../models/fileModel";
export const uploadFileControler = (req: Request, res: Response) => {
    try {
        UPLOAD_OBJ.single("file")(req, res, (err) => {
            if (err) {
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

            // Successful file upload
            res.status(200).json({
                message: "File uploaded successfully",
                filePath: req.file.path,
            });
        });
    } catch (error) {
        // Handle other errors (e.g., system errors)
        res.status(500).json({
            error: "Internal server error",
            // details: error.message,
        });
    }
};
