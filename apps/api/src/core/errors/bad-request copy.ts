export class UnprocessableEntity extends Error {
  constructor() {
    super();
    this.message = "Unprocessable Entity!";
  }
}
