import { Handler, Request } from "express";
import { headerSchema } from "core/utils/authorization";
import { BadRequest } from "core/errors/bad-request";
import { WorkReflectorRepositoryInMemory } from "core/repositories/inmemory-impl/work-reflector-repository";
import { MakeSignInspectUseCase } from "core/usecases/make-sign-inspect";
import { SignRepositoryInMemory } from "core/repositories/inmemory-impl/sign-repository";
import { z } from "zod";
import { UnprocessableEntity } from "core/errors/unprocessable-entity";
import {
  IReflectorMeasurements,
} from "core/domains/object-values.ts/reflectometer-measurements";

const bodyParser = z.object({
  author_name: z.string(),
  device_coord: z.tuple([z.string(), z.string()]),
  pictures: z.array(z.string()),
  status: z.enum(["DAMAGE", "LOW_REFLETANCE", "OK"]),
  work_type: z.enum(["MONITORING", "CONSERVATION"]),
  code: z.string(),
  direction: z.enum(["NORTH", "SOUTH"]),
  kilometer_position: z.string(),
  measurements: z.array(
    z.object({
      color: z.enum(["YELLOW", "WHITE", "BROWN", "GREEN", "RED", "BLUE"]),
      measures: z.array(z.number()).max(5),
      average: z.number().optional(),
      minimum_value: z.number(),
      film_type: z.string(),
    })
  ),
});

const pathParser = z.object({
  signId: z.string()
})

const handler: Handler = async (req, res) => {
  const pathDto = pathParser.safeParse(req.params);
  const bodyDto = bodyParser.safeParse(req.body);
  const headerDto = headerSchema.safeParse(req.headers);

  if (!bodyDto.success || !pathDto.success) {
    return res.json(new UnprocessableEntity()).status(400);
  }
  if (!headerDto.success) {
    return res.json(new BadRequest()).status(400);
  }
  const result = await new MakeSignInspectUseCase(
    SignRepositoryInMemory.getInstance(),
    WorkReflectorRepositoryInMemory.getInstance()
  ).execute({
    sign_id: pathDto.data.signId,
    author_name: bodyDto.data.author_name,
    device_coord: bodyDto.data.device_coord,
    pictures: bodyDto.data.pictures,
    status: bodyDto.data.status,
    work_type: bodyDto.data.work_type,
    code: bodyDto.data.code,
    measurements: bodyDto.data.measurements as IReflectorMeasurements[],
    direction: bodyDto.data.direction,
    kilometer_position: bodyDto.data.kilometer_position,
  });

  return res.json(result.body).status(result.status);
};

export const makeSignIssue = {
  handler,
};
