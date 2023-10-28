import { Work } from "../../domains/work";
import { WorkReflectorRepository } from "../work-reflector-repository";

export class WorkReflectorRepositoryInMemory implements WorkReflectorRepository {
  public db: Work[] = [];
  private static instance: WorkReflectorRepositoryInMemory;

  private constructor() {}

  static getInstance(): WorkReflectorRepositoryInMemory {
    if (!WorkReflectorRepositoryInMemory.instance) {
      WorkReflectorRepositoryInMemory.instance = new WorkReflectorRepositoryInMemory();
    }

    return WorkReflectorRepositoryInMemory.instance;
  }

  async register(work: Work): Promise<void> {
    this.db.push(work)
  }
}
