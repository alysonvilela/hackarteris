import { Handler, Request } from "express";
import { headerSchema } from "../../core/utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { GetIssuesUseCase } from "../../core/usecases/get-issues";
import { WorkReflectorRepositoryInMemory } from "../../core/repositories/inmemory-impl/work-reflector-repository";
import { MakeSignInspectUseCase } from "../../core/usecases/make-sign-inspect";
import { SignRepositoryInMemory } from "../../core/repositories/inmemory-impl/sign-repository";
import { z } from "zod";
import { UnprocessableEntity } from "../../core/errors/unprocessable-entity";
import {
  IReflectorMeasurements,
  ReflectorMeasures,
} from "../../core/domains/object-values.ts/reflectometer-measurements";
import { SendMessageToTeamUseCase } from "../../core/usecases/send-message-to-team";
import { httpClient } from "../../adapters/http-client";
import { TeamRepositoryInMemory } from "../../core/repositories/inmemory-impl/team-repository";


const pathParser = z.object({
  workId: z.string(),
  teamId: z.string()
})

const handler: Handler = async (req, res) => {
  const pathDto = pathParser.safeParse(req.params);
  const headerDto = headerSchema.safeParse(req.headers);

  if (!pathDto.success) {
    return res.json(new UnprocessableEntity()).status(400);
  }
  if (!headerDto.success) {
    return res.json(new BadRequest()).status(400);
  }
  const result = await new SendMessageToTeamUseCase(
    httpClient,
    WorkReflectorRepositoryInMemory.getInstance(),
    TeamRepositoryInMemory.getInstance()
  ).execute({
    team_id: pathDto.data.teamId,
    work_id: pathDto.data.workId
  });

  return res.json(result.body).status(result.status);
};

export const sendMessageToTeam = {
  handler,
};
