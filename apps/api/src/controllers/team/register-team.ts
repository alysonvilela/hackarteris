import { Handler, Request } from "express";
import { headerSchema } from "../../utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { GetIssuesUseCase } from "../../core/usecases/get-issues";
import { WorkReflectorRepositoryInMemory } from "../../core/repositories/inmemory-impl/work-reflector-repository";
import { RegisterTeamUseCase } from "../../core/usecases/register-team";
import { TeamRepositoryInMemory } from "../../core/repositories/inmemory-impl/team-repository";
import { UnprocessableEntity } from "../../core/errors/unprocessable-entity";
import { z } from "zod";

const bodyParser= z.object({
  groupId: z.string(),
  name: z.string()
});

const handler: Handler = async (req, res) => {
  const bodyDto = bodyParser.safeParse(req.body);
  const headerDto = headerSchema.safeParse(req.headers);

  if (!bodyDto.success) {
    return res.json(new UnprocessableEntity()).status(422)
  }

  if (!headerDto.success) {
    return res.json(new BadRequest()).status(400)
  }
  const result = await new RegisterTeamUseCase(
    TeamRepositoryInMemory.getInstance()
  ).execute({
    group_id: bodyDto.data.groupId,
    name: bodyDto.data.name
  });

  return res.json(result.body).status(result.status);
};

export const registerTeam = {
  handler,
};
