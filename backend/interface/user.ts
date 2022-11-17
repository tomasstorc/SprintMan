export default interface IUser {
  email: string;
  name: string;
  password: string;
  repeatPassword?: string;
  role: "admin" | "student" | "editor" | "teacher";
}
