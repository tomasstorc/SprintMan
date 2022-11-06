import validatePassword from "../../utils/validate-password";

describe("validate password", () => {
  test("correct password", () => {
    expect(validatePassword("Asdf009,PW")).toBeTruthy();
  });
  test("invalid password", () => {
    expect(validatePassword("hello")).toBeFalsy();
  });
});
