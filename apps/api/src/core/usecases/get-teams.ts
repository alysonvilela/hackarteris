import { Flatted } from "../base/entity";
import { ITeam, Team } from "../domains/team";
import { ConflictError } from "../errors/conflict-error";
import { TeamRepository } from "../repositories/team-repository";

interface GetTeamsRequest {
  name: string;
  group_id: string
}

interface GetTeamsResponse {
  body?: Flatted<ITeam>[] | ConflictError
  status: 200;
}

export class GetTeamsUseCase {
  constructor(
    private readonly teamsRepository: TeamRepository
  ) {}

  async execute(req: GetTeamsRequest): Promise<GetTeamsResponse> {
    const existing = await this.teamsRepository.queryAll()

    return {
      body: existing.map((i) => i.flatted),
      status: 200,
    };
  }
}
