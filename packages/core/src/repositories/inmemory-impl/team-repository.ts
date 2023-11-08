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

  async queryByWpGroupId(id: string): Promise<Team | null> {
    const team = this.db.find(item => item.flatted.wp_group_id)

    if(!team) return null

    return team
  }
  
  async queryById(id: string): Promise<Team | null> {
    const team = this.db.find(item => item.flatted.id === id)

    if(!team) return null

    return team
  }

  async queryAll(): Promise<Team[]> {
    return this.db
  }

  async register(team: Team): Promise<void> {
    this.db.push(team);
  }
}
