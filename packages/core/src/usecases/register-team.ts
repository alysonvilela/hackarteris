import { Flatted } from "../base/entity";
import { ITeam, Team } from "../domains/team";
import { ConflictError } from "../errors/conflict-error";
import { TeamRepository } from "../repositories/team-repository";

interface RegisterTeamRequest {
  name: string;
  group_id: string
}

interface RegisterTeamResponse {
  body?: Flatted<ITeam> | ConflictError
  status: 201 | 409;
}

export class RegisterTeamUseCase {
  constructor(
    private readonly teamsRepository: TeamRepository
  ) {}

  async execute(req: RegisterTeamRequest): Promise<RegisterTeamResponse> {
    const existing = await this.teamsRepository.queryByWpGroupId(req.group_id);

    if (existing) {
      return {
        status: 409,
        body: new ConflictError()
      };
    }

    const team = Team.create({
      wp_group_id: req.group_id,
      group_name: req.name,
    });

    await this.teamsRepository.register(team);

    return {
      body: team.flatted,
      status: 201,
    };
  }
}
