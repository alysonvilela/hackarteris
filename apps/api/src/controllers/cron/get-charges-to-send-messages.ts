import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { GetChargesToSendMessagesUseCase } from "../../core/usecases/get_charges_to_send_messages";
import { Handler } from "express";

export const handler: Handler = async (req, res) => {
  const usecase = new GetChargesToSendMessagesUseCase(
    {},
    inMemoryRepositories.chargeRepository
  );
  await usecase.execute();

  return res.json({
    ok: true,
  }).status(200)
};
