import { Sign } from "../../domains/sign";
import { SignRepository } from "../sign-repository";

export class SignRepositoryInMemory implements SignRepository {
  public db: Sign[] = [];
  private static instance: SignRepositoryInMemory;

  private constructor() {}

  static getInstance(): SignRepositoryInMemory {
    if (!SignRepositoryInMemory.instance) {
      SignRepositoryInMemory.instance = new SignRepositoryInMemory();
    }

    return SignRepositoryInMemory.instance;
  }

  async queryById(id: string): Promise<Sign | null> {
    const existing = this.db.find((i) => i.id === id)
    if(!existing) return null;

    return existing
  }

  async register(sign: Sign): Promise<void> {
    this.db.push(sign)
  }
}
