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
exports.DatabaseHandler = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const config_1 = require("./../utils/config");
const DATABASE_PATH = `database/${config_1.DATABASE_FILENAME}`;
class DatabaseHandler {
    getConnector() {
        const db = new sqlite3_1.default.Database(DATABASE_PATH, (err) => {
            if (err) {
                console.error("Error opening database:", err.message);
            }
            else {
                console.log("Connected to the SQLite database.");
            }
        });
        return db;
    }
    closeDB(DBconnector) {
        DBconnector.close((err) => {
            if (err) {
                console.error("Error closing the database:", err.message);
            }
            else {
                console.log("Database connection closed.");
            }
        });
    }
    runQuery(query, params = []) {
        const db = this.getConnector();
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) {
                    console.error("Error running query:", err.message);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
            this.closeDB(db); // Close the connection after the query is done
        });
    }
    getAll(query, params = []) {
        const db = this.getConnector();
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) {
                    console.error("Error fetching data:", err.message);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
            this.closeDB(db); // Close the connection after data is retrieved
        });
    }
}
exports.DatabaseHandler = DatabaseHandler;
// init Database table
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new DatabaseHandler().runQuery(`CREATE TABLE IF NOT EXISTS ${config_1.USER_FILE_TABLE_NAME} (
                username TEXT NOT NULL PRIMARY KEY,
                filename TEXT NOT NULL
            )`);
        console.log(`Database initialized with ${config_1.USER_FILE_TABLE_NAME} table`);
    }
    catch (error) {
        console.error("Error initializing database");
    }
});
exports.default = initDb;
