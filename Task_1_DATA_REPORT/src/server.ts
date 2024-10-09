import express, { Request, Response } from "express";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

import { FILES_LOCATION } from "./utils/config";
import initDatabase from './models/database';
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";



const app = express();
const PORT = process.env.PORT || 3000;
app.locals.__basedir = __dirname;
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());



// Create uploads directory if it doesn't exist
const dir = `./${FILES_LOCATION}`;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

app.use("/api", fileRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    initDatabase(); 
});
