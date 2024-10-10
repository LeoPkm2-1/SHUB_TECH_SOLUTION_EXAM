import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";
import { FileUtiles } from "../utils/fileUtils";
import { FILES_LOCATION } from "../utils/config";

export const userUpFileController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const username: string = req.body.username;
    const newFileName: string = req.file!.filename;
    const userModel = new UserModel();
    const isExisted = await userModel.isUserExisted(username);
    console.log("\n\ninsert file" + newFileName);
    console.log("username", username);
    if (isExisted) {
        // user has upload file before
        console.log("user _ exist");
        let oldFilename = await userModel.getFilenameByUsername(username);
        if (typeof oldFilename == "string") {
            // reupload new file
            userModel.updateFileNameOfUser(username, newFileName);
            
            // delete old file when not use
            FileUtiles.deleteFile(`${FILES_LOCATION}/${oldFilename}`);
        }
    } else {
        // new user
        console.log("create entry");
        userModel.insertDataIntoUserFileTable(username, newFileName);
    }
};

export const userInforController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method.toUpperCase() != "GET") {
        res.status(400).send("Method is not valid");
        return;
    }
    let username = req.query.username ?? undefined;
    if (typeof username == "undefined") {
        res.status(400).send("Not get username");
        return;
    }
    const userModel = new UserModel();
    const userFileName = await userModel.getFilenameByUsername(
        username as string
    );
    if (typeof userFileName == "undefined") {
        res.status(200).send("User doest not have file");
        return;
    }
    res.status(200).json({
        msg: "Query success",
        fileName: userFileName,
    });
};
