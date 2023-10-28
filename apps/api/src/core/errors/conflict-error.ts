export class ConflictError extends Error {
  constructor() {
    super();
    this.message = "Conflict!";
  }
}
