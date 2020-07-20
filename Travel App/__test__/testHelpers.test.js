import {
    getDate,
    getTodayDate,
    calculateDateDuration,
    endAfterStart
} from "../src/client/js/helpers"
import {describe, expect} from "@jest/globals";

describe("Testing Calculate number of days between two dates", () => {
    test("Testing 1", () => {
            const start = '2020-7-23';
            const end = '2020-7-20';
            expect(calculateDateDuration(start, end)).toBe(3);
        }
    ), test("Testing 2", () => {
            const start = '2020-7-28';
            const end = '2020-7-20';
            expect(calculateDateDuration(start, end)).toBe(8);
        }
    )
});


describe("Testing Checking end date after start date", () => {
    test("Testing 1", () => {
            const start = '2020-7-23';
            const end = '2020-7-20';
            expect(endAfterStart(start, end)).toBe(false);
        }
    ), test("Testing 2", () => {
            const end = '2020-7-28';
            const start = '2020-7-20';
            expect(endAfterStart(start, end)).toBe(true);
        }
    )
});
