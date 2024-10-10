"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./utils/config");
const database_1 = __importDefault(require("./models/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const queryRoutes_1 = __importDefault(require("./routes/queryRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.locals.__basedir = __dirname;
app.use(express_1.default.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// parse application/json
app.use(body_parser_1.default.json());
// Create uploads directory if it doesn't exist
const dir = `./${config_1.FILES_LOCATION}`;
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
// Create database directory if it doesn't exist
const dbdir = `./${config_1.DATABASE_FOLDER_LOCATION}`;
if (!fs_1.default.existsSync(dbdir)) {
    fs_1.default.mkdirSync(dbdir);
}
app.use("/api", fileRoutes_1.default);
app.use("/api", userRoutes_1.default);
app.use("/api", queryRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    (0, database_1.default)();
});
