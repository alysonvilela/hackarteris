import { Sign } from "../domains/sign";
import { Work } from "../domains/work";

export abstract class WorkReflectorRepository {
  abstract register(work: Work): Promise<void>;
}
