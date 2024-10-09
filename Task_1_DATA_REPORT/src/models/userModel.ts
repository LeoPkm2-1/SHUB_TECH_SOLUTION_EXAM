import { DatabaseHandler } from "./database";
import { USER_FILE_TABLE_NAME } from "./../utils/config";
export class UserModel {
    isUserExisted(username: string): Promise<boolean> {
        const dbManipulate = new DatabaseHandler();
        const db = dbManipulate.getConnector();
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT 1 FROM ${USER_FILE_TABLE_NAME} WHERE username = ? LIMIT 1`,
                [username],
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
    async insertDataIntoUserFileTable(username: string, fileName: string) {
        const dbManipulate = new DatabaseHandler();
        await dbManipulate.runQuery(
            `INSERT INTO ${USER_FILE_TABLE_NAME} (username, filename) VALUES (?, ?)`,
            [username, fileName]
        );
    }
}
