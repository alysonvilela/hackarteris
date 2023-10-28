import { Sign } from "../domains/sign";
import { Work } from "../domains/work";

export abstract class WorkReflectorRepository {
  abstract queryByWorkId(id: string): Promise<Work | null>
  abstract queryIssueds(): Promise<Work[]>;
  abstract register(work: Work): Promise<void>;
}
