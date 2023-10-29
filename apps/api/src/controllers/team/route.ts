import { Router } from "express";
import { registerTeam } from "./register-team";
import { getTeams } from "./get-teams";

const teams = Router();

teams.get(
  "/team/all",
  async (request, response, next) =>
    await getTeams.handler(request, response, next)
);

teams.post(
  "/team/register",
  async (request, response, next) =>
    await registerTeam.handler(request, response, next)
);

export { teams };
