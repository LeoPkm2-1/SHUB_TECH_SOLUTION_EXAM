import multer from "multer";
import { FILES_LOCATION } from "./../utils/config";

const FILE_STORAGE_CONF: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        // callback(null, "docsSave/");
        callback(null, `${FILES_LOCATION}/`);
    },
    filename(req, file, callback) {
        console.log(file);

        callback(
            null,
            Date.now() + file.originalname + path.extname(file.originalname)
        );
    },
});
