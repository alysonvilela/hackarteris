import { Work } from "../../domains/work";
import { WorkReflectorRepository } from "../work-reflector-repository";

export class WorkReflectorRepositoryInMemory
  implements WorkReflectorRepository
{
  public db: Work[] = [];
  private static instance: WorkReflectorRepositoryInMemory;

  private constructor() {}

  static getInstance(): WorkReflectorRepositoryInMemory {
    if (!WorkReflectorRepositoryInMemory.instance) {
      WorkReflectorRepositoryInMemory.instance =
        new WorkReflectorRepositoryInMemory();
    }

    return WorkReflectorRepositoryInMemory.instance;
  }

  async register(work: Work): Promise<void> {
    this.db.push(work);
  }

  async queryByWorkId(id: string): Promise<Work | null> {
    const work = this.db.find((item) => item.flatted.id === id);

    if (!work) return null;

    return work;
  }

  async queryIssueds(): Promise<Work[]> {
    const filteredList = this.db.filter((i) => {
      const existent = this.db.filter(
        (value) => value.flatted.sign_id === i.flatted.sign_id
      );
      return existent[existent.length - 1].flatted.status !== "OK";
    });

    return filteredList;
  }
}
