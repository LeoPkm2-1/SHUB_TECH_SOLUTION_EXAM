import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";
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
            userModel.updateFileNameOfUser(username, newFileName);
            console.log({oldFilename});
            
        }
    } else {
        // new user
        console.log("create entry");
        userModel.insertDataIntoUserFileTable(username, newFileName);
    }
};
