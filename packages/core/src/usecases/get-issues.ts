import { Flatted } from "../base/entity";
import { IWork } from "../domains/work";
import { ConflictError } from "../errors/conflict-error";
import { WorkReflectorRepositoryInMemory } from "../repositories/inmemory-impl/work-reflector-repository";

interface GetIssuesRequest {}

interface GetIssuesResponse {
  body?: Flatted<IWork>[] | ConflictError;
  status: 200;
}

export class GetIssuesUseCase {
  constructor(
    private readonly workReflectorRepositoryInMemory: WorkReflectorRepositoryInMemory
  ) {}

  async execute(_req: GetIssuesRequest): Promise<GetIssuesResponse> {
    const existing = await this.workReflectorRepositoryInMemory.queryIssueds();

    return {
      body: existing.map((i) => i.flatted),
      status: 200,
    };
  }
}
