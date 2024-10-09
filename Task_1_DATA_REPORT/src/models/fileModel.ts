import multer from "multer";
import path from "path";

import { FILES_LOCATION } from "./../utils/config";
import { FileNameUtils } from "./../utils/fileUtils";

// Configure Multer storage
export const FILE_STORAGE_CONF: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${FILES_LOCATION}/`);
    },
    filename(req, file, callback) {
        // console.log(file);
        // console.log("aaaaaaaa==========");
        const newFileName: string = FileNameUtils.uniqueFileNameGen();
        callback(null, newFileName + path.extname(file.originalname));
    },
});

// setup upload object
export const UPLOAD_OBJ = multer({ storage: FILE_STORAGE_CONF });
