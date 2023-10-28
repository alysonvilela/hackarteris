export class BadRequest extends Error {
  constructor() {
    super();
    this.message = "Bad request!";
  }
}
