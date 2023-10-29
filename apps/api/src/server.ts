import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { issues } from "./controllers/issues/route";
import { teams } from "./controllers/team/route";
import { works } from "./controllers/work/route";
import { wahaProxy } from "./controllers/gw/route";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(issues)
    .use(teams)
    .use(works)
    .use(wahaProxy)
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
