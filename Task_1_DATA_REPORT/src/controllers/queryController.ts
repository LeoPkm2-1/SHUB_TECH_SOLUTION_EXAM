import { Request, Response, NextFunction } from "express";
import ExcelJS from "exceljs";
import { type TransactionType, HEADER_ROW_NUMBER } from "./../utils/config";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimeUtils } from "../utils/timeUtils";

dayjs.extend(customParseFormat);
export const queryHandleController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let transactionsList: TransactionType[] = [];
    const workbook = new ExcelJS.Workbook();
    const { startTime, endTime } = req.body.queryRevenueData;

    // Read the Excel file
    await workbook.xlsx.readFile(
        "docsSave/418c78797cf44254b6d34de27ea3cbb4_1728544553929.xlsx"
    );

    // Get the first worksheet
    const worksheet = workbook.worksheets[0];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > HEADER_ROW_NUMBER) {
            // Dữ liệu bắt đầu từ dòng 9 (skip header)
            const id = row.getCell(1).text;
            const time = row.getCell(3).text; // "Giờ" - cột 3
            const amount = row.getCell(9).value; // "Thành tiền" - cột 9

            transactionsList.push({
                id,
                time,
                payAmount: parseFloat(
                    (amount as string).toString().replace(/,/g, "") // cast data from string to float
                ), // Chuyển từ string sang float
            });
        }
    });

    // TimeUtils.isTimeBetweenInclusiveBothStartEnd();
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

    // // Print the first 5 rows
    // const rowCount = worksheet.rowCount;
    // const printLimit = Math.min(rowCount, 2); // Ensure we don't exceed actual row count
    // for (let i = 1; i <= printLimit; i++) {
    //     console.log({ i });

    //     const row = worksheet.getRow(i);
    //     const rowData = row.values; // Get values of the row
    //     console.log(`Row ${i}:`, rowData);
    // }
    // res.json({
    //     romNum: rowCount,
    // });
    // // Read an Excel file
    // const workbook = new ExcelJS.Workbook();
    // await workbook.xlsx.readFile("docsSave/418c78797cf44254b6d34de27ea3cbb4_1728544553929.xlsx");
    // const worksheet = workbook.getWorksheet(1); // Get the first worksheet
    // worksheet!.eachRow((row, rowNumber) => {
    //     // console.log(`Row ${rowNumber} = ${JSON.stringify(row.values)}`);
    //     console.log(`Row ${rowNumber}`);
    //     console.log(row);

    // });
    // res.send("Query ahihi ok");
};
