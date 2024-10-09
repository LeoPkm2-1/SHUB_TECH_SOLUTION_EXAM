"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.get("/morning", (req, res) => {
    res.send("Good morning");
});
app.post('/hello', (req, res) => {
    // const userString = req.body.string;  // Nhận string từ request body
    // res.send(`Hello World, you sent: ${userString}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
