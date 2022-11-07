export default class ErrorResponse {
  private status;
  private errorMsg;

  constructor(errorMsg: string | Error) {
    this.status = "error";
    this.errorMsg = errorMsg;
  }
}
