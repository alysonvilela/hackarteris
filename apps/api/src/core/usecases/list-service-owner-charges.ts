import { Flatted } from "../base/entity";
import { ICharge } from "../domains/charge";
import { IMember } from "../domains/members";
import { ChargeTeamMembersRepository } from "../repositories/charge-team-member-repository";
import { ITeam } from 'src/core/domains/team';

interface UsecaseResquest {
  ownerId: string;
}

type RequestResponse = Omit<Flatted<ICharge>, 'team'> & {
  team: Omit<Flatted<ITeam>, 'members'> & {
    members: Flatted<IMember>[]
  }
}

interface UsecaseResponse {
  status: 200;
  body?: RequestResponse[]
}

export class ListServiceOwnerChargesUseCase {
  constructor(private readonly chargeRepository: ChargeTeamMembersRepository) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const charges = await this.chargeRepository.queryAllByOwnerId(req.ownerId);

    const body: RequestResponse[] = charges.map((i) => ({
      ...i.flatted,
      team: {
        ...i.flatted.team.flatted,
        members: i.flatted.team.flatted.members.map((member) => member.flatted)
      }
    }))

    return {
      status: 200,
      body
    };
  }
}
