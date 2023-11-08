import { Flatted } from "../base/entity";
import { IWork } from "../domains/work";
import { BadRequest } from "../errors/bad-request";
import { WorkReflectorRepository } from "../repositories/work-reflector-repository";

interface GetWorkRequest {
  work_id: string
}

interface GetWorkResponse {
  body: Flatted<IWork> | BadRequest
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
        body: new BadRequest(),
        status: 409
      }
    }

    return {
      body: existing.flatted,
      status: 200,
    };
  }
}
