import express, { Request, Response } from "express";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import type { User } from "./models/userModel";
import { FILES_LOCATION } from "./utils/config";
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

// ========================== my code   ============
// Create uploads directory if it doesn't exist
const dir = `./${FILES_LOCATION}`;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         // callback(null, "docsSave/");
//         callback(null, `${FILES_LOCATION}/`);
//     },
//     filename(req, file, callback) {
//         console.log(file);

//         callback(
//             null,
//             Date.now() + file.originalname + path.extname(file.originalname)
//         );
//     },
// });

// const upload = multer({ storage: storage });

// // Upload endpoint
// app.post("/upload", upload.single("file"), (req, res) => {
//     if (!req.file) {
//         res.status(400).send("No file uploaded.");
//         return;
//     }
//     res.json(req.file);
// });

// // Upload endpoint
// app.post("/upload", async (req, res) => {
//     try {
//         upload.single("file")(req, res, (err) => {
//             if (err) {
//                 // Handle Multer errors (e.g., file size limits)
//                 return res.status(500).json({
//                     error: "File upload failed",
//                     details: err.message,
//                 });
//             }

//             if (!req.file) {
//                 return res.status(400).json({ error: "No file uploaded." });
//             }

//             // Successful file upload
//             res.status(200).json({
//                 message: "File uploaded successfully",
//                 filePath: req.file.path,
//             });
//         });
//     } catch (error) {
//         // Handle other errors (e.g., system errors)
//         res.status(500).json({
//             error: "Internal server error",
//             // details: error.message,
//         });
//     }
// });

app.use("/api", fileRoutes);

/// ======================= test ======================

app.get("/morning", (req: Request, res: Response) => {
    res.send("Good morning");
});

app.post("/hello", (req: Request, res: Response) => {
    const userString: string = req.body.string; // Nhận string từ request body
    console.log(req.body);

    res.send(`Hello World, you sent: ${userString}`);
});

app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
