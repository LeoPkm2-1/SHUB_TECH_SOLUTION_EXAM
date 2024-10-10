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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = require("./database");
const config_1 = require("./../utils/config");
class UserModel {
    // check user existed in database
    isUserExisted(username) {
        const dbManipulate = new database_1.DatabaseHandler();
        const db = dbManipulate.getConnector();
        return new Promise((resolve, reject) => {
            db.get(`SELECT 1 FROM ${config_1.USER_FILE_TABLE_NAME} WHERE username = ? LIMIT 1`, [username.toLowerCase()], (err, row) => {
                if (err) {
                    console.error("Error checking user existence:", err.message);
                    reject(err);
                }
                else {
                    resolve(!!row); // If row exists, return true, otherwise false
                }
            });
            dbManipulate.closeDB(db); // Close the connection after the check
        });
    }
    // insert user and their file name into database
    insertDataIntoUserFileTable(username, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbManipulate = new database_1.DatabaseHandler();
            yield dbManipulate.runQuery(`INSERT INTO ${config_1.USER_FILE_TABLE_NAME} (username, filename) VALUES (?, ?)`, [username.toLowerCase(), fileName]);
        });
    }
    // update filename of user
    updateFileNameOfUser(username, updateFileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbManipulate = new database_1.DatabaseHandler();
            yield dbManipulate.runQuery(`UPDATE ${config_1.USER_FILE_TABLE_NAME} SET filename = ? WHERE username = ?`, [updateFileName, username.toLowerCase()]);
        });
    }
    // get filename of user
    getFilenameByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbManipulate = new database_1.DatabaseHandler();
            const db = dbManipulate.getConnector();
            try {
                return yield new Promise((resolve, reject) => {
                    db.get(`SELECT filename FROM ${config_1.USER_FILE_TABLE_NAME} WHERE username = ?`, [username.toLowerCase()], (err, row) => {
                        var _a;
                        dbManipulate.closeDB(db); // Close the connection after the query
                        if (err) {
                            console.error("Error retrieving filename:", err.message);
                            reject(err);
                        }
                        else if (!row) {
                            resolve(undefined); // If no record found, resolve to null
                        }
                        else {
                            resolve((_a = row.filename) !== null && _a !== void 0 ? _a : undefined); // Return the single filename
                        }
                    });
                });
            }
            catch (error) {
                console.error("Error in async function:", error);
            }
        });
    }
}
exports.UserModel = UserModel;
