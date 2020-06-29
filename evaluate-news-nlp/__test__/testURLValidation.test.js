import checkURLValidation  from "../src/client/js/checkURLValidation"

describe("Testing the URL Validation functionality", () => {
    test("Testing 1 of the checkURLValidation() function", () => {
        const url = 'http://www.google-com.123.com';
        expect(checkURLValidation(url)).toBeTruthy();
    }
    ),
    test("Testing 2 of the checkURLValidation() function", () => {
        const url = 'http://www.gfh.c';
        expect(checkURLValidation(url)).toBeFalsy();
    }
    )
});