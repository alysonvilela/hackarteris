import { Handler, Request } from "express";
import { headerSchema } from "../../utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { GetIssuesUseCase } from "../../core/usecases/get-issues";
import { WorkReflectorRepositoryInMemory } from "../../core/repositories/inmemory-impl/work-reflector-repository";
import { RegisterTeamUseCase } from "../../core/usecases/register-team";
import { TeamRepositoryInMemory } from "../../core/repositories/inmemory-impl/team-repository";
import { UnprocessableEntity } from "../../core/errors/bad-request copy";
import { z } from "zod";
import { GetTeamsUseCase } from "../../core/usecases/get-teams";


const handler: Handler = async (req, res) => {
  const headerDto = headerSchema.safeParse(req.headers);

  if (!headerDto.success) {
    return res.json(new BadRequest()).status(400)
  }
  const result = await new GetTeamsUseCase(
    TeamRepositoryInMemory.getInstance()
  ).execute();

  return res.json(result.body).status(result.status);
};

export const getTeams = {
  handler,
};
