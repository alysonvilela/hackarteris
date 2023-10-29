import { Router } from "express";
import { getIssues } from "./get-issues";
import { makeSignIssue } from "./make-sign-inspect";

const issues = Router();

issues.get(
  "/issues",
  async (request, response, next) =>
    await getIssues.handler(request, response, next)
);

issues.post(
  "/sign/:signId",
  async (request, response, next) =>
    await makeSignIssue.handler(request, response, next)
);

export { issues };
