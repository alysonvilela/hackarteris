import { sign } from "crypto";
import { Flatted } from "../base/entity";
import { ITeam, Team } from "../domains/team";
import { ConflictError } from "../errors/conflict-error";
import { SignRepository } from "../repositories/sign-repository";
import { WorkReflectorRepository } from "../repositories/work-reflector-repository";
import { Sign } from "../domains/sign";
import { IWork, Work, WorkStatus, Worktype } from "../domains/work";
import { Reflector, ReflectorColor, ReflectorDirection } from "../domains/reflector";
import { ReflectorMeasurements, ReflectorMeasures } from "../domains/object-values.ts/reflectometer-measurements";

interface MakeSignInspectRequest {
  sign_id: string;
  author_name: string;
  device_coord: [x: string, y:string]
  pictures: string[]
  status: WorkStatus
  work_type: Worktype
  code: string
  color: [ReflectorColor]
  direction: ReflectorDirection
  film_type: string
  kilometer_position: string
  measures: ReflectorMeasures,
  average?: number,
  minimum_value: number
}

interface MakeSignInspectResponse {
  body?: Flatted<IWork> | ConflictError
  status: 201 | 409;
}

export class MakeSignInspectUseCase {
  constructor(
    private readonly signRepository: SignRepository,
    private readonly workReflectorRepositoryInMemory: WorkReflectorRepository
  ) {}

  async execute(req: MakeSignInspectRequest): Promise<MakeSignInspectResponse> {
    const existing = await this.signRepository.queryById(req.sign_id);

    if(!existing) {
      await this.signRepository.register(Sign.create({}, req.sign_id))
    }

    const work = Work.create({
      sign_id: req.sign_id,
      author: req.author_name,
      device_coord: req.device_coord,
      pictures: req.pictures,
      status: req.status,
      work_type: req.work_type,
    })

    const reflector = Reflector.create({
      work_id: work.id,
      code: req.code,
      color: req.color,
      direction: req.direction,
      film_type: req.film_type,
      kilometer_position: req.kilometer_position,
      measurements: ReflectorMeasurements.create({
        measures: req.measures,
        minimum_value: req.minimum_value,
        average: req.average
      }),
    })

    work.addReflector(reflector)

    await this.workReflectorRepositoryInMemory.register(work)

    return {
      body: work.flatted,
      status: 201,
    };
  }
}
