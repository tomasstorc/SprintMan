import validateEmail from "../../utils/validate-email";

describe("email validation", () => {
  test("correct email address", () => {
    expect(validateEmail("tomas.storc@gmail.com")).toBe(true);
  });
  test("invalid email address", () => {
    expect(validateEmail("tomas@ffd.c")).toBe(false);
  });
});
