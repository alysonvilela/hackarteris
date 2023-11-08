import { BaseEntity } from "../../core/base/entity";
import { Optional } from "../utils/optional";

export interface ITeam {
  group_name: string
  wp_group_id: string
  created_at: string
  updated_at: string | null
}

export class Team extends BaseEntity<ITeam> {

  public changeName(name: string) {
    this.props.group_name = name
    return this
  }

  static create(
    props: Optional<ITeam, "created_at" | "updated_at">,
    id?: string
  ) {
    const team = new Team(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
        updated_at: props.updated_at ?? null,
      },
      id
    );

    return team
  }
}
