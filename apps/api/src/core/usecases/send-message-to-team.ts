import { TeamRepository } from "../repositories/team-repository";
import { ChargeRepository } from "../repositories/charge-repository";
import { makeMessage } from "../../utils/make-message";
import { HttpClient } from "../../adapters/http-client";
import { ServiceOwnerRepository } from "../repositories/service-owners-repository";

interface UsecaseResquest {
  charge_id: string;
}

export class SendMessageToTeamsUseCase {
  constructor(
    // private readonly queue: TeamRepository,
    private readonly httpClient: HttpClient,
    private readonly serviceOwnerRepository: ServiceOwnerRepository,
    private readonly chargeRepository: ChargeRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute(req: UsecaseResquest): Promise<void> {
    const charge = await this.chargeRepository.queryById(req.charge_id);

    if (charge) {
      const chargeTeam = await this.teamRepository.queryByChargeId(charge.flatted.id);
      const owner = await this.serviceOwnerRepository.queryById(charge.flatted.owner_id);
      if (chargeTeam) {
        const valueForEachMember =
          charge.flatted.service.value / chargeTeam.flatted.members.length

        const message = makeMessage({
          customMessage: charge.flatted.custom_message ?? null,
          serviceName: charge.flatted.service.name,
          value: valueForEachMember,
          pixKey: owner?.flatted.pix_key ?? "vc sabe qual eh otari0!",
        });
      
        for (const member of chargeTeam.flatted.members) {
          await this.httpClient.request.get(
            `${process.env.WHATSAPP_BASE_URL}/api/sendText`,
            {
              params: {
                phone: member.flatted.phone,
                text: message,
                session: 'default'
              }
            }
          );
        }
      }
    }
  }
}
