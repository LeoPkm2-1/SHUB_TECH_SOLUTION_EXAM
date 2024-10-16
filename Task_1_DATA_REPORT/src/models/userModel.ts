import { DatabaseHandler } from "./database";
import { USER_FILE_TABLE_NAME } from "./../utils/config";

interface User_File_Row_InterFace {
    username: string;
    filename: string;
}
export class UserModel {
    // check user existed in database
    isUserExisted(username: string): Promise<boolean> {
        const dbManipulate = new DatabaseHandler();
        const db = dbManipulate.getConnector();
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT 1 FROM ${USER_FILE_TABLE_NAME} WHERE username = ? LIMIT 1`,
                [username.toLowerCase()],
                (err, row) => {
                    if (err) {
                        console.error(
                            "Error checking user existence:",
                            err.message
                        );
                        reject(err);
                    } else {
                        resolve(!!row); // If row exists, return true, otherwise false
                    }
                }
            );
            dbManipulate.closeDB(db); // Close the connection after the check
        });
    }

    // insert user and their file name into database
    async insertDataIntoUserFileTable(username: string, fileName: string) {
        const dbManipulate = new DatabaseHandler();
        await dbManipulate.runQuery(
            `INSERT INTO ${USER_FILE_TABLE_NAME} (username, filename) VALUES (?, ?)`,
            [username.toLowerCase(), fileName]
        );
    }

    // update filename of user
    async updateFileNameOfUser(username: string, updateFileName: string) {
        const dbManipulate = new DatabaseHandler();
        await dbManipulate.runQuery(
            `UPDATE ${USER_FILE_TABLE_NAME} SET filename = ? WHERE username = ?`,
            [updateFileName, username.toLowerCase()]
        );
    }

    // get filename of user
    async getFilenameByUsername(username: string): Promise<string | undefined> {
        const dbManipulate = new DatabaseHandler();
        const db = dbManipulate.getConnector();
        try {
            return await new Promise<string | undefined>((resolve, reject) => {
                db.get(
                    `SELECT filename FROM ${USER_FILE_TABLE_NAME} WHERE username = ?`,
                    [username.toLowerCase()],
                    (err, row: User_File_Row_InterFace) => {
                        dbManipulate.closeDB(db); // Close the connection after the query

                        if (err) {
                            console.error(
                                "Error retrieving filename:",
                                err.message
                            );
                            reject(err);
                        } else if (!row) {
                            resolve(undefined); // If no record found, resolve to null
                        } else {
                            resolve(row.filename ?? undefined); // Return the single filename
                        }
                    }
                );
            });
        } catch (error) {
            console.error("Error in async function:", error);
        }
    }
}
