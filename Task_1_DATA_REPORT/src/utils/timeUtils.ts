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
}


// const startTime1 = "14:30:00"; // Valid time
// const endTime1 = "11:09:00"; // Valid time

// const ok = TimeUtils.isStartTimeEarlierThanEndTime(startTime1, endTime1);

// console.log({ ok });
