import dayjs from "dayjs";
import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";
import { TimeUtils } from "../utils/timeUtils";


interface Query_Data_Struture {
    username: string | undefined;
    filename: string | undefined;
    startTime: string;
    endTime: string;
}

//  user exist Handle Middleware
export const userExistMid = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const username = req.body.username ?? undefined;
    if (typeof username == "undefined") {
        res.status(400).json({
            error: "username not found!",
        });
        return;
    }
    const usermodel = new UserModel();
    let isExisted: boolean = await usermodel.isUserExisted(username);
    if (!isExisted) {
        res.status(400).json({
            error: "username not found!",
        });
        return;
    }
    const dataToHandle: Query_Data_Struture = {
        username: username as string,
        filename: undefined,
        startTime: "",
        endTime: "",
    };
    req.body.queryRevenueData = dataToHandle;
    next();
};

// file exist Handle Middleware
export const fileExistMid = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const username = req.body.queryRevenueData.username as string;
    const usermodel = new UserModel();
    const fileNameOfUser = await usermodel.getFilenameByUsername(username);
    if (typeof fileNameOfUser == "undefined") {
        res.status(400).json({
            error: "Not found file!",
        });
        return;
    }
    req.body.queryRevenueData.filename = fileNameOfUser;

    next();
};

// time handle Middleware
export const timeValidMid = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { startTime, endTime } = req.body;
        if (!startTime || !endTime) {
            res.status(400).json({
                error: "Please provide both startTime and endTime",
            });
            return;
        }
        if (typeof startTime != "string" || typeof endTime != "string") {
            res.status(400).json({
                error: "Format time error. Time format is string 'HH:mm:ss'",
            });
            return;
        }
        if (
            !TimeUtils.checkTimeValidFormat(startTime) ||
            !TimeUtils.checkTimeValidFormat(endTime)
        ) {
            res.status(400).json({
                error: "Format time error. Time format is string 'HH:mm:ss'",
            });
            return;
        }
        if (!TimeUtils.isStartTimeEarlierThanEndTime(startTime, endTime)) {
            res.status(400).json({
                error: "startTime must be earlier than endTime ",
            });
            return;
        }
        req.body.queryRevenueData.startTime = startTime.split(" ").join("");
        req.body.queryRevenueData.endTime = endTime.split(" ").join("");
        next();
    } catch (error) {
        res.status(400).json({
            error: "Time query error",
        });
        return;
    }
};

// list of middlewares to pre-process query revenue
export const queryRevenueMid = () => [userExistMid, fileExistMid, timeValidMid];
