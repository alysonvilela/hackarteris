
import { Handler, Request } from "express";
import { headerSchema } from "../../utils/authorization";
import { BadRequest } from "../../core/errors/bad-request";
import { ListServiceOwnerChargesUseCase } from "../../core/usecases/list-service-owner-charges";
import { ChargeTeamMembersRepositoryPg } from "../../core/repositories/pg-impl/charge-team-member-repository";


export const handler: Handler = async (req, res) => {

  const headerDto = headerSchema.safeParse(req.headers);

  if (!headerDto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }
  const usecase = new ListServiceOwnerChargesUseCase(
    ChargeTeamMembersRepositoryPg.getInstance()
  );

  const result = await usecase.execute({
    ownerId: headerDto.data["x-owner-id"],
  });


  return res.json(result.body).status(result.status)
};
