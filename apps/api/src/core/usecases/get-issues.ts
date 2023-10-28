import { Flatted } from "../base/entity";
import { ISign } from "../domains/sign";
import { ITeam, Team } from "../domains/team";
import { IWork } from "../domains/work";
import { ConflictError } from "../errors/conflict-error";
import { WorkReflectorRepositoryInMemory } from "../repositories/inmemory-impl/work-reflector-repository";

interface GetTeamsRequest {}

interface GetTeamsResponse {
  body?: Flatted<IWork>[] | ConflictError;
  status: 200;
}

export class GetTeamsUseCase {
  constructor(
    private readonly workReflectorRepositoryInMemory: WorkReflectorRepositoryInMemory
  ) {}

  async execute(_req: GetTeamsRequest): Promise<GetTeamsResponse> {
    const existing = await this.workReflectorRepositoryInMemory.queryIssueds();

    return {
      body: existing.map((i) => i.flatted),
      status: 200,
    };
  }
}
