export const FILES_LOCATION = "docsSave";
export const DATABASE_FOLDER_LOCATION = "database";
export const DATABASE_FILENAME = "data.db";
export const USER_FILE_TABLE_NAME = "USER_FILE";
export const ERROR_TYPE_FILE_UP_NOT_XLSX_OR_XLS =
    "Only .xlsx and .xls files are allowed";

export const ERROR_TYPE_FILE_UP_NOT_XLSX = "Only .xlsx files are allowed";
export interface TransactionType {
    id: string;
    time: string;
    payAmount: number;
}

export const HEADER_ROW_NUMBER = 8;
