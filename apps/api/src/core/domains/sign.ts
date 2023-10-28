import { BaseEntity, Flatted } from "../base/entity";
import { Optional } from "../../utils/optional";
import { Work } from "./work";

export interface ISign {
  created_at: string
  updated_at: string | null
  deleted_at: string | null

  works?: Work[]
}

export class Sign extends BaseEntity<ISign> {

  static create(
    props: Optional<ISign, "created_at" | "updated_at" | "deleted_at">,
    id?: string
  ) {
    const sign = new Sign(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
        updated_at: props.updated_at ?? null,
        deleted_at: props.deleted_at ?? null,
      },
      id
    );

    return sign
  }
}
