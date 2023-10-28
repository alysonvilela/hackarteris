import { Team } from "../../domains/team";
import { TeamRepository } from "../team-repository";

export class TeamRepositoryInMemory implements TeamRepository {
  public db: Team[] = [];
  private static instance: TeamRepositoryInMemory;

  private constructor() {}
  static getInstance(): TeamRepositoryInMemory {
    if (!TeamRepositoryInMemory.instance) {
      TeamRepositoryInMemory.instance = new TeamRepositoryInMemory();
    }

    return TeamRepositoryInMemory.instance;
  }

  async queryByChargeId(chargeId: string): Promise<Team | null> {
    const team = this.db.find((i) => i.flatted.charge_id === chargeId);
    if (team) {
      return team;
    }
    return null;
  }
  async register(team: Team): Promise<void> {
    this.db.push(team);
  }
}
