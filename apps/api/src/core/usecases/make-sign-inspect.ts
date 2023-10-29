import { sign } from "crypto";
import { Flatted } from "../base/entity";
import { ITeam, Team } from "../domains/team";
import { ConflictError } from "../errors/conflict-error";
import { SignRepository } from "../repositories/sign-repository";
import { WorkReflectorRepository } from "../repositories/work-reflector-repository";
import { Sign } from "../domains/sign";
import { IWork, Work, WorkStatus, WorkType } from "../domains/work";
import { Reflector, ReflectorColor, ReflectorDirection } from "../domains/reflector";
import { ReflectorMeasurements, ReflectorMeasures } from "../domains/object-values.ts/reflectometer-measurements";

interface MakeSignInspectRequest {
  sign_id: string;
  author_name: string;
  device_coord: [x: string, y:string]
  pictures: string[]
  status: WorkStatus
  work_type: WorkType
  code: string
  direction: ReflectorDirection
  kilometer_position: string
  measurements: {
    color: ReflectorColor
    film_type: string
    measures: ReflectorMeasures,
    average?: number,
    minimum_value: number
  }[]
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

    let measurements: ReflectorMeasurements[] = []

    for(let item of req.measurements) {
      measurements = [...measurements,  ReflectorMeasurements.create({
        measures: item.measures,
        minimum_value: item.minimum_value,
        average: item.average,
        color: item.color,
        film_type: item.film_type
      })]
    }

    const reflector = Reflector.create({
      work_id: work.id,
      code: req.code,
      direction: req.direction,
      kilometer_position: req.kilometer_position,
      measurements,
    })

    work.addReflector(reflector)

    await this.workReflectorRepositoryInMemory.register(work)

    return {
      body: work.flatted,
      status: 201,
    };
  }
}
