import { Request, Response, NextFunction } from "express";
import ExcelJS from "exceljs";
import {
    type TransactionType,
    FILES_LOCATION,
    HEADER_ROW_NUMBER,
} from "./../utils/config";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimeUtils } from "../utils/timeUtils";

dayjs.extend(customParseFormat);

// Revenue query handler
export const queryHandleController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let transactionsList: TransactionType[] = [];
    const workbook = new ExcelJS.Workbook();
    const { startTime, endTime, filename } = req.body.queryRevenueData;
    console.log({ filename });

    // Read the Excel file
    await workbook.xlsx.readFile(`${FILES_LOCATION}/${filename}`);

    // Get the first worksheet
    const worksheet = workbook.worksheets[0];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > HEADER_ROW_NUMBER) {
            // Dữ liệu bắt đầu từ dòng 9 (skip header)
            const id = row.getCell(1).text;
            const time = row.getCell(3).text; // "Time colum" - col 3
            const amount = row.getCell(9).value; // "payment amount colum" - col 9

            transactionsList.push({
                id,
                time,
                payAmount: parseFloat(
                    (amount as string).toString().replace(/,/g, "") // cast data from string to float
                ),
            });
        }
    });

    // calculate sum base on list of transactions
    const totalRevenue = transactionsList.reduce((sum, trans) => {
        const transTime = trans.time;
        if (
            TimeUtils.isTimeBetweenInclusiveBothStartEnd(
                transTime,
                startTime,
                endTime
            )
        ) {
            return sum + trans.payAmount;
        }
        return sum;
    }, 0);

    res.status(200).json({ Revenue: totalRevenue });
};
