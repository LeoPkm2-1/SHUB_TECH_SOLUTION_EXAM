import sqlite3 from "sqlite3";
import { DATABASE_FILENAME, USER_FILE_TABLE_NAME } from "./../utils/config";
const DATABASE_PATH: string = `database/${DATABASE_FILENAME}`;

export class DatabaseHandler {
    getConnector(): sqlite3.Database {
        const db = new sqlite3.Database(DATABASE_PATH, (err) => {
            if (err) {
                console.error("Error opening database:", err.message);
            } else {
                console.log("Connected to the SQLite database.");
            }
        });

        return db;
    }
    closeDB(DBconnector: sqlite3.Database): void {
        DBconnector.close((err) => {
            if (err) {
                console.error("Error closing the database:", err.message);
            } else {
                console.log("Database connection closed.");
            }
        });
    }
    runQuery(query: string, params: any[] = []): Promise<void> {
        const db = this.getConnector();
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) {
                    console.error("Error running query:", err.message);
                    reject(err);
                } else {
                    resolve();
                }
            });
            this.closeDB(db); // Close the connection after the query is done
        });
    }
    getAll<T>(query: string, params: any[] = []): Promise<T[]> {
        const db = this.getConnector();
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) {
                    console.error("Error fetching data:", err.message);
                    reject(err);
                } else {
                    resolve(rows as T[]);
                }
            });
            this.closeDB(db); // Close the connection after data is retrieved
        });
    }
}

const initDb = async () => {
    try {
        new DatabaseHandler().runQuery(
            `CREATE TABLE IF NOT EXISTS ${USER_FILE_TABLE_NAME} (
                username TEXT NOT NULL PRIMARY KEY,
                filename TEXT NOT NULL
            )`
        );
        console.log(`Database initialized with ${USER_FILE_TABLE_NAME} table`);
    } catch (error) {
        console.error("Error initializing database");
    }
};
export default initDb;

// // Open the database connection
// export const connectToDB = (): sqlite3.Database => {
//     const db = new sqlite3.Database(DATABASE_PATH, (err) => {
//         if (err) {
//             console.error("Error opening database:", err.message);
//         } else {
//             console.log("Connected to the SQLite database.");
//         }
//     });
//     return db;
// };

// // Close database connection
// export const closeDB = (db: sqlite3.Database): void => {
//     db.close((err) => {
//         if (err) {
//             console.error("Error closing the database:", err.message);
//         } else {
//             console.log("Database connection closed.");
//         }
//     });
// };

// // Function to run a query (Insert/Update/Delete)
// export const runQuery = (query: string, params: any[] = []): Promise<void> => {
//     const db = connectToDB();
//     return new Promise((resolve, reject) => {
//         db.run(query, params, function (err) {
//             if (err) {
//                 console.error("Error running query:", err.message);
//                 reject(err);
//             } else {
//                 resolve();
//             }
//         });
//         closeDB(db); // Close the connection after the query is done
//     });
// };

// // Function to retrieve data (SELECT)
// export const getAll = <T>(query: string, params: any[] = []): Promise<T[]> => {
//     const db = connectToDB();
//     return new Promise((resolve, reject) => {
//         db.all(query, params, (err, rows) => {
//             if (err) {
//                 console.error("Error fetching data:", err.message);
//                 reject(err);
//             } else {
//                 resolve(rows as T[]);
//             }
//         });
//         closeDB(db); // Close the connection after data is retrieved
//     });
// };
