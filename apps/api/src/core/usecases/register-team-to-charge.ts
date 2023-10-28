import { TeamRepository } from "../repositories/team-repository";
import { ChargeRepository } from "../repositories/charge-repository";
import { ITeam, Team } from "../domains/team";
import { IMember, Member } from "../domains/members";
import { Flatted } from "../base/entity";

interface UsecaseResquest {
  owner_id: string;
  charge_id: string;
  phones: string[];
}

interface RequestBody {
  team: Omit<Flatted<ITeam>, 'members'> & {
    members: Omit<Flatted<IMember>, 'team_id'>[]
  }
}

interface UsecaseResponse {
  status: 201 | 409 | 401;
  body?: RequestBody | { message: string }
}

export class RegisterTeamToChargeUseCase {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly chargeRepository: ChargeRepository
  ) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const chargeEntity = await this.chargeRepository.queryById(req.charge_id);
    const charge = chargeEntity.flatted

    if (charge?.owner_id === req.owner_id) {
      const chargeHasTeam = await this.teamRepository.queryByChargeId(
        req.charge_id
      );

      if (chargeHasTeam?.flatted?.members?.length) {
        return {
          status: 409,
          body: {
            message: "There is an existing team to this charge."
          }
        };
      }

      let members: Member[] = [];
      const team = Team.create({
        charge_id: req.charge_id,
      });

      for (const phone of req.phones) {
        const member = Member.create({
          phone,
          team_id: team.id
        });
        members.push(member)
      }

      team.addMembers(members);

      await this.teamRepository.register(team);

      return {
        status: 201,
        body: {
            team: {
              ...team.flatted,
              members: team.flatted.members.map(({flatted: {team_id, ...rest}}) => ({
                ...rest
              }))
            }
        }
      };
    }
    return {
      status: 401,
    };
  }
}
