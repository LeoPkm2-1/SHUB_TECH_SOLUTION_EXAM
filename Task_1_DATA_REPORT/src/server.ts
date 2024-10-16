import express, { query, Request, Response } from "express";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

import { FILES_LOCATION,DATABASE_FOLDER_LOCATION } from "./utils/config";
import initDatabase from "./models/database";
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";
import queryRoutes from "./routes/queryRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
app.locals.__basedir = __dirname;
app.use(express.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Create uploads directory if it doesn't exist
const dir = `./${FILES_LOCATION}`;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Create database directory if it doesn't exist
const dbdir = `./${DATABASE_FOLDER_LOCATION}`;
if (!fs.existsSync(dbdir)) {
    fs.mkdirSync(dbdir);
}

app.use("/api", fileRoutes);
app.use("/api", userRoutes);
app.use("/api", queryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    initDatabase();
});
