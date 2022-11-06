import validateUrl from "../../utils/validate-url";

describe("url validator", () => {
  test("valid url", () => {
    expect(validateUrl("https://google.com")).toBeTruthy();
  });

  test("invalid url", () => {
    expect(validateUrl("notvalid")).toBeFalsy();
  });
});
