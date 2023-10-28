import { Handler } from "express";
import { RegisterTeamToChargeUseCase } from "../../core/usecases/register-team-to-charge";
import { z } from "zod";
import { headerSchema } from "../../utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { TeamRepositoryPg } from "../../core/repositories/pg-impl/team-repository";
import { ChargeRepositoryPg } from "../../core/repositories/pg-impl/charge-repository";


const pathSchema = z.object({
  chargeId: z.string(),
});

const bodySchema = z.object({
  phones: z.array(z.string()),
});

export const handler: Handler = async (req, res) => {
  const json: unknown = JSON.parse(req.body);
  const path = pathSchema.safeParse(req.params);
  const dto = bodySchema.safeParse(json);
  const headerDto = headerSchema.safeParse(req.headers);

  if (!headerDto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }


  if (!path.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new RegisterTeamToChargeUseCase(
    TeamRepositoryPg.getInstance(),
    ChargeRepositoryPg.getInstance()
  );

  const response = await usecase.execute({
    charge_id: path.data.chargeId,
    owner_id: headerDto.data["x-owner-id"],
    phones: dto.data.phones,
  });

  return res.json(response.body).status(response.status)
};
