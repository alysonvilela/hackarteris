import { Handler, Request } from "express";
import { headerSchema } from "../../utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { GetIssuesUseCase } from "../../core/usecases/get-issues";
import { WorkReflectorRepositoryInMemory } from "../../core/repositories/inmemory-impl/work-reflector-repository";

const handler: Handler = async (req, res) => {
  const headerDto = headerSchema.safeParse(req.headers);

  if (!headerDto.success) {
    return res.json(new BadRequest()).status(400)
  }
  const result = await new GetIssuesUseCase(
    WorkReflectorRepositoryInMemory.getInstance()
  ).execute({});

  return res.json(result.body).status(result.status);
};

export const getIssues = {
  handler,
};
