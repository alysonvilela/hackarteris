export class ResourceNotFound extends Error {
  constructor() {
    super();
    this.message = "Resource not found!";
  }
}
