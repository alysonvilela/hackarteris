import { ChargeRepository } from "../repositories/charge-repository";
import { Charge, ICharge } from "../domains/charge";
import { formatDateToCron } from "../../utils/format-date-to-cron";
import { Flatted } from "../base/entity";

interface UsecaseResquest {
  ownerId: string;
  serviceName: string;
  servicePrice: number;
  customMessage?: string;
  demandDay: string;
}

interface UsecaseResponse {
  status: 201;
  body: Flatted<ICharge>
}

export class RegisterChargeUseCase {
  constructor(private readonly chargeRepository: ChargeRepository) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const charge = Charge.create({
      owner_id: req.ownerId,
      service: {
        name: req.serviceName,
        value: req.servicePrice,
      },
      custom_message: req.customMessage,
      demand_day: req.demandDay,
    });

    console.log('creating charge', charge)

    await this.chargeRepository.register(charge);
    
    return {
      status: 201,
      body: charge.flatted
    };
  }
}
