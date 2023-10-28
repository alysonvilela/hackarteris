import { BaseEntity, Flatted } from "../../core/base/entity";
import { Optional } from "../../utils/optional";

export interface IServiceOwner {
  name: string;
  phone: string;
  pix_key: string;
  created_at: string;
  updated_at: string | null;
}

export class ServiceOwner extends BaseEntity<IServiceOwner> {

  static create(
    props: Optional<IServiceOwner, "created_at" | "updated_at">,
    id?: string
  ) {
    const serviceOwner = new ServiceOwner(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
        updated_at: props.updated_at ?? null,
      },
      id
    );

    return serviceOwner
  }
}
