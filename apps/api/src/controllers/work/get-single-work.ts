import { Handler, Request } from "express";
import { headerSchema } from "../../utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { GetIssuesUseCase } from "../../core/usecases/get-issues";
import { WorkReflectorRepositoryInMemory } from "../../core/repositories/inmemory-impl/work-reflector-repository";
import { RegisterTeamUseCase } from "../../core/usecases/register-team";
import { TeamRepositoryInMemory } from "../../core/repositories/inmemory-impl/team-repository";
import { UnprocessableEntity } from "../../core/errors/unprocessable-entity";
import { z } from "zod";
import { GetTeamsUseCase } from "../../core/usecases/get-teams";
import { GetWorkUseCase } from "../../core/usecases/get-work";
import { Work } from "../../core/domains/work";

const pathParser = z.object({
  workId: z.string()
})

const handler: Handler = async (req, res) => {
  const pathDto = pathParser.safeParse(req.params);
  const headerDto = headerSchema.safeParse(req.headers);

  if (!pathDto.success) {
    return res.json(new UnprocessableEntity()).status(400);
  }
  if (!headerDto.success) {
    return res.json(new BadRequest()).status(400)
  }
  const result = await new GetWorkUseCase(
    WorkReflectorRepositoryInMemory.getInstance()
  ).execute({
    work_id: pathDto.data.workId
  });

  return res.json(result.body).status(result.status);
};

export const getSingleWork = {
  handler,
};
