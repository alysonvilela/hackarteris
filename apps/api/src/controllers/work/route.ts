import { Router } from "express";
import { getSingleWork } from "./get-single-work";

const works = Router();

works.get(
  "/work/:workId",
  async (request, response, next) =>
    await getSingleWork.handler(request, response, next)
);


export { works };
