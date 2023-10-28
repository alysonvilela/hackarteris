import { Flatted } from "../base/entity";
import { IWork } from "../domains/work";
import { ConflictError } from "../errors/conflict-error";
import { WorkReflectorRepository } from "../repositories/work-reflector-repository";

interface GetWorkRequest {
  work_id: string
}

interface GetWorkResponse {
  body: Flatted<IWork> | ConflictError
  status: 200 | 409;
}

export class GetWorkUseCase {
  constructor(
    private readonly worksRepository: WorkReflectorRepository
  ) {}

  async execute(req: GetWorkRequest): Promise<GetWorkResponse> {
    const existing = await this.worksRepository.queryByWorkId(req.work_id)

    if(!existing) {
      return {
        body: new ConflictError(),
        status: 409
      }
    }

    return {
      body: existing.flatted,
      status: 200,
    };
  }
}
