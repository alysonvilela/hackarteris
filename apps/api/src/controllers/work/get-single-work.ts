import { Handler, Request } from "express";
import { headerSchema } from "core/utils/authorization";
import { BadRequest } from "core/errors/bad-request";
import { WorkReflectorRepositoryInMemory } from "core/repositories/inmemory-impl/work-reflector-repository";
import { UnprocessableEntity } from "core/errors/unprocessable-entity";
import { z } from "zod";
import { GetWorkUseCase } from "core/usecases/get-work";

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
