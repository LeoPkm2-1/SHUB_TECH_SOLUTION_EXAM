import fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
export class FileNameUtils {
    static getFileName(filePath: string): string {
        // Parse the file path
        return path.basename(filePath);
    }
    static getFileNameWithoutExt(filePath: string): string {
        // Parse the file path
        const parsedPath = path.parse(filePath);

        // Get the filename without the extension
        const fileNameWithoutExt = parsedPath.name;
        return fileNameWithoutExt;
    }

    static uniqueFileNameGen(): string {
        const uniqueId = uuidv4();
        const newName = uniqueId.replace(/-/g, "");
        return newName + `_${Date.now()}`;
    }
}

export class FileUtiles {
    static deleteFile(filePath: string): void {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });
    }
}
