import { Router } from "express";
import { proxyWahaCurrentSession } from "./proxy-wp-current-session";

const wahaProxy = Router();

wahaProxy.get(
  "/wp/current-session",
  async (request, response, next) =>
    await proxyWahaCurrentSession.handler(request, response, next)
);

wahaProxy.get(
  "/wp/qr",
  async (request, response, next) =>
    await proxyWahaCurrentSession.handler(request, response, next)
);

export { wahaProxy };
