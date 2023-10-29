import { Handler } from "express";
import { RegisterChargeUseCase } from "../../core/usecases/register-charge";
import { z } from "zod";
import { headerSchema } from "../../utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { ChargeRepositoryPg } from "../../core/repositories/pg-impl/charge-repository";

const bodySchema = z.object({
  customMessage: z.string().optional(),
  demandDay: z.string(),
  serviceName: z.string(),
  totalPriceInCents: z.number(),
});

export const handler: Handler = async (req, res) => {
  const json: unknown = JSON.parse(req.body);

  const headerDto = headerSchema.safeParse(req.headers);
  
  if (!headerDto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const dto = bodySchema.safeParse(json);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new RegisterChargeUseCase(ChargeRepositoryPg.getInstance());

  const result = await usecase.execute({
    ownerId: headerDto.data["x-owner-id"],
    customMessage: dto.data.customMessage,
    demandDay: dto.data.demandDay,
    serviceName: dto.data.serviceName,
    servicePrice: dto.data.totalPriceInCents,
  });

  return res.json(result.body).status(result.status)
};
