import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";
export const userUpFileController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const username: string = req.body.username;
    const filename: string = req.file!.filename;
    const userModel = new UserModel();
    const isExisted = await userModel.isUserExisted(username);
    console.log("Done_" + req.file?.filename);
    console.log("username", username);
    if (isExisted) {
        // user has upload file before
        console.log("user _ exist");
    } else {
        // new user
        console.log("create entry");
        userModel.insertDataIntoUserFileTable(username, filename);
    }
};
