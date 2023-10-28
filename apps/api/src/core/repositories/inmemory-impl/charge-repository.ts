import { Charge } from "../../domains/charge";
import { ChargeRepository } from "../charge-repository";

export class ChargeRepositoryInMemory implements ChargeRepository {
  public db: Charge[] = [];

  private static instance: ChargeRepositoryInMemory;

  private constructor() {}

  static getInstance(): ChargeRepositoryInMemory {
    if (!ChargeRepositoryInMemory.instance) {
      ChargeRepositoryInMemory.instance = new ChargeRepositoryInMemory();
    }

    return ChargeRepositoryInMemory.instance;
  }

  async queryById(chargeId: string): Promise<Charge | null> {
    const charge = this.db.find((i) => i.id === chargeId);
    if (charge) {
      return charge;
    }

    return null;
  }
  async queryAllChargeIdsByDemandDay(
    demandDay: string
  ): Promise<string[] | null> {
    const charges = this.db
      .filter((i) => i.flatted.demand_day === demandDay)
      .map((i) => i.id);
    if (charges.length) {
      return charges;
    }

    return null;
  }

  async queryAllByOwnerId(ownerId: string): Promise<Charge[]> {
    const charges = this.db.filter((i) => i.flatted.owner_id === ownerId);

    return [...charges];
  }

  async register(charge: Charge): Promise<void> {
    this.db.push(charge);
  }
}
