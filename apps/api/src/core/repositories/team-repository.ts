import { Team } from "../domains/team";

export abstract class TeamRepository {
  abstract queryByChargeId(chargeId: string): Promise<Team | null>;
  abstract register(team: Team): Promise<void>;
}
