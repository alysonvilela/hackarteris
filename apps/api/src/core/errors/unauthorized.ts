export class Unauthorized extends Error {
  constructor() {
    super();
    this.message = "Unauthorized.";
  }
}
