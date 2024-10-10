"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtiles = exports.FileNameUtils = void 0;
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
class FileNameUtils {
    static getFileName(filePath) {
        // Parse the file path
        return path.basename(filePath);
    }
    static getFileNameWithoutExt(filePath) {
        // get file name without extention
        // Parse the file path
        const parsedPath = path.parse(filePath);
        // Get the filename without the extension
        const fileNameWithoutExt = parsedPath.name;
        return fileNameWithoutExt;
    }
    static uniqueFileNameGen() {
        // create unique File name
        const uniqueId = (0, uuid_1.v4)();
        const newName = uniqueId.replace(/-/g, "");
        return newName + `_${Date.now()}`;
    }
}
exports.FileNameUtils = FileNameUtils;
class FileUtiles {
    static deleteFile(filePath) {
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });
    }
}
exports.FileUtiles = FileUtiles;
