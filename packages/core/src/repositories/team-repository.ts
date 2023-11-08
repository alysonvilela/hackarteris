import { Team } from "../domains/team";

export abstract class TeamRepository {
  abstract queryByWpGroupId(id: string): Promise<Team | null>;
  abstract queryById(groupId: string): Promise<Team | null>;
  abstract queryAll(): Promise<Team[]>;
  abstract register(team: Team): Promise<void>;
}
