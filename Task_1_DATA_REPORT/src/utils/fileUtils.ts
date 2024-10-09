import { nanoid } from "nanoid";
import * as path from "path";

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
        const uniqueId: string = nanoid();
        return uniqueId + `_${Date.now()}`;
    }
}
