export default class SuccessResponse {
  private status;
  private data;
  private errors: Array<undefined>;
  constructor(status: string, data?: [] | string) {
    this.status = status;
    this.data = data || [];
    this.errors = [];
  }
}
