import { Sign } from "../domains/sign";
import { Team } from "../domains/team";

export abstract class SignRepository {
  abstract queryById(id: string): Promise<Sign | null>;

  abstract register(sign: Sign): Promise<void>;
}
