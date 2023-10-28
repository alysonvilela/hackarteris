import { SendMessageToTeamsUseCase } from "../../core/usecases/send-message-to-team";
import { httpClient } from "../../adapters/http-client";
import { z } from "zod";
import { Handler } from "express";
import { BadRequest } from "../../core/errors/bad-request";
import { ServiceOwnerRepositoryPg } from "../../core/repositories/pg-impl/service-owners-repository";
import { ChargeRepositoryPg } from "../../core/repositories/pg-impl/charge-repository";
import { TeamRepositoryPg } from "../../core/repositories/pg-impl/team-repository";

const bodySchema = z.object({
  chargeId: z.string(),
});

export const handler: Handler = async (req) => {
  const dto = bodySchema.safeParse(req.params);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new SendMessageToTeamsUseCase(
    httpClient,
    ServiceOwnerRepositoryPg.getInstance(),
    ChargeRepositoryPg.getInstance(),
    TeamRepositoryPg.getInstance()
  );

  try {
    await usecase.execute({
      charge_id: dto.data.chargeId,
    });
  } catch (err) {
    return {
      body: JSON.stringify({
        err,
      }),
      statusCode: 500,
    };
  }

  return {
    body: JSON.stringify({
      ok: true,
    }),
    statusCode: 200,
  };
};
