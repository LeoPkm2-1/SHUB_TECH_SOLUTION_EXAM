"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHandleController = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const config_1 = require("./../utils/config");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const timeUtils_1 = require("../utils/timeUtils");
dayjs_1.default.extend(customParseFormat_1.default);
// Revenue query handler
const queryHandleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let transactionsList = [];
    const workbook = new exceljs_1.default.Workbook();
    const { startTime, endTime, filename } = req.body.queryRevenueData;
    console.log({ filename });
    // Read the Excel file
    yield workbook.xlsx.readFile(`${config_1.FILES_LOCATION}/${filename}`);
    // Get the first worksheet
    const worksheet = workbook.worksheets[0];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > config_1.HEADER_ROW_NUMBER) {
            // Dữ liệu bắt đầu từ dòng 9 (skip header)
            const id = row.getCell(1).text;
            const time = row.getCell(3).text; // "Time colum" - col 3
            const amount = row.getCell(9).value; // "payment amount colum" - col 9
            transactionsList.push({
                id,
                time,
                payAmount: parseFloat(amount.toString().replace(/,/g, "") // cast data from string to float
                ),
            });
        }
    });
    // calculate sum base on list of transactions
    const totalRevenue = transactionsList.reduce((sum, trans) => {
        const transTime = trans.time;
        if (timeUtils_1.TimeUtils.isTimeBetweenInclusiveBothStartEnd(transTime, startTime, endTime)) {
            return sum + trans.payAmount;
        }
        return sum;
    }, 0);
    res.status(200).json({ Revenue: totalRevenue });
});
exports.queryHandleController = queryHandleController;
