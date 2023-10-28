import { Charge } from "../domains/charge";

export abstract class ChargeTeamMembersRepository {
  abstract queryAllByOwnerId(id: string): Promise<Charge[]>;
}
