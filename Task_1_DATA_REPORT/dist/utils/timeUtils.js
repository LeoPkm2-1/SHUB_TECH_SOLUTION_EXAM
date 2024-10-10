"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUtils = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(customParseFormat_1.default);
class TimeUtils {
    static checkTimeValidFormat(time) {
        time = time.split(" ").join("");
        // Define the regex for HH:mm:ss
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        // Check if it matches the regex pattern
        if (!timeRegex.test(time)) {
            return false;
        }
        // check time valid value
        const parsedTime = (0, dayjs_1.default)(time, "HH:mm:ss", true);
        return parsedTime.isValid();
    }
}
exports.TimeUtils = TimeUtils;
_a = TimeUtils;
TimeUtils.isStartTimeEarlierThanEndTime = (startTime, endTime) => {
    startTime = startTime.split(" ").join("");
    endTime = endTime.split(" ").join("");
    if (!_a.checkTimeValidFormat(startTime) ||
        !_a.checkTimeValidFormat(endTime)) {
        throw new Error("Invalid time format for comparison");
    }
    const parsedStartTime = (0, dayjs_1.default)(startTime, "HH:mm:ss", true);
    const parsedEndTime = (0, dayjs_1.default)(endTime, "HH:mm:ss", true);
    return parsedStartTime.isBefore(parsedEndTime);
};
TimeUtils.isTimeBetweenInclusiveBothStartEnd = (time, startTime, endTime) => {
    startTime = startTime.split(" ").join("");
    endTime = endTime.split(" ").join("");
    time = time.split(" ").join("");
    if (!_a.checkTimeValidFormat(startTime) ||
        !_a.checkTimeValidFormat(endTime) ||
        !_a.checkTimeValidFormat(time)) {
        throw new Error("Invalid time format for comparison");
    }
    const parsedStartTime = (0, dayjs_1.default)(startTime, "HH:mm:ss", true);
    const parsedEndTime = (0, dayjs_1.default)(endTime, "HH:mm:ss", true);
    const parsedTime = (0, dayjs_1.default)(time, "HH:mm:ss", true);
    // Check if time is between or exactly equal to startTime and endTime
    return ((parsedTime.isAfter(parsedStartTime) ||
        parsedTime.isSame(parsedStartTime)) &&
        (parsedTime.isBefore(parsedEndTime) ||
            parsedTime.isSame(parsedEndTime)));
};
