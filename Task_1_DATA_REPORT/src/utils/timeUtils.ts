import { time } from "console";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export class TimeUtils {
    static checkTimeValidFormat(time: string) {
        time = time.split(" ").join("");
        // Define the regex for HH:mm:ss
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        // Check if it matches the regex pattern
        if (!timeRegex.test(time)) {
            return false;
        }
        // check time valid value
        const parsedTime = dayjs(time, "HH:mm:ss", true);
        return parsedTime.isValid();
    }

    static isStartTimeEarlierThanEndTime = (
        startTime: string,
        endTime: string
    ): boolean => {
        startTime = startTime.split(" ").join("");
        endTime = endTime.split(" ").join("");
        if (
            !this.checkTimeValidFormat(startTime) ||
            !this.checkTimeValidFormat(endTime)
        ) {
            throw new Error("Invalid time format for comparison");
        }
        const parsedStartTime = dayjs(startTime, "HH:mm:ss", true);
        const parsedEndTime = dayjs(endTime, "HH:mm:ss", true);
        return parsedStartTime.isBefore(parsedEndTime);
    };

    static isTimeBetweenInclusiveBothStartEnd = (
        time: string,
        startTime: string,
        endTime: string
    ) => {
        startTime = startTime.split(" ").join("");
        endTime = endTime.split(" ").join("");
        time = time.split(" ").join("");
        if (
            !this.checkTimeValidFormat(startTime) ||
            !this.checkTimeValidFormat(endTime) ||
            !this.checkTimeValidFormat(time)
        ) {
            throw new Error("Invalid time format for comparison");
        }
        const parsedStartTime = dayjs(startTime, "HH:mm:ss", true);
        const parsedEndTime = dayjs(endTime, "HH:mm:ss", true);
        const parsedTime = dayjs(time, "HH:mm:ss", true);
        // Check if time is between or exactly equal to startTime and endTime
        return (
            (parsedTime.isAfter(parsedStartTime) ||
                parsedTime.isSame(parsedStartTime)) &&
            (parsedTime.isBefore(parsedEndTime) ||
                parsedTime.isSame(parsedEndTime))
        );
    };
}
