import { ServiceOwner } from "../../domains/service-owner";
import { ServiceOwnerRepository } from "../../repositories/service-owners-repository";

export class ServiceOwnerRepositoryInMemory implements ServiceOwnerRepository {
  private static instance: ServiceOwnerRepositoryInMemory;

  public db: ServiceOwner[] = [];

  private constructor() {}

  static getInstance(): ServiceOwnerRepositoryInMemory {
    if (!ServiceOwnerRepositoryInMemory.instance) {
      ServiceOwnerRepositoryInMemory.instance = new ServiceOwnerRepositoryInMemory();
    }

    return ServiceOwnerRepositoryInMemory.instance;
  }

  async queryByPhone(phone: string): Promise<ServiceOwner | null> {
    const owner = this.db.find((i) => i.flatted.phone === phone);
    if (owner) {
      return owner;
    }

    return null;
  }

  async queryById(id: string): Promise<ServiceOwner | null> {
    const owner = this.db.find((i) => i.id === id);
    if (owner) {
      return owner;
    }

    return null;
  }

  async register(serviceOwner: ServiceOwner): Promise<ServiceOwner> {
    this.db.push(serviceOwner)
    return serviceOwner
  }

}
