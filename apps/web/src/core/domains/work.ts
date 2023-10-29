import { BaseEntity } from '../../core/base/entity';
import { Optional } from '../../utils/optional';
import { Reflector } from './reflector';

export type WorkStatus = 'DAMAGE' | 'LOW_REFLETANCE' | 'OK';
export type WorkType = 'MONITORING' | 'CONSERVATION';

export interface IWork {
  sign_id: string;
  author: string; // Should be a ref for a user (author_id)
  work_type: WorkType;
  status: WorkStatus;
  device_coord: [x: string, y: string];
  pictures: string[];
  created_at: string;
  reflector?: Reflector;
}

export class Work extends BaseEntity<IWork> {
  static create(props: Optional<IWork, 'created_at'>, id?: string) {
    const work = new Work(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
      },
      id
    );

    return work;
  }

  public addReflector(reflector: Reflector) {
    this.props.reflector = reflector;

    return this;
  }
}
