import { BaseEntity } from "../../core/base/entity";
import { Optional } from "../../utils/optional";
import { Member } from "./members";

export interface ITeam {
  charge_id: string
  members: Member[]
  created_at: string
  updated_at: string | null
}

export class Team extends BaseEntity<ITeam> {

  public addMembers(members: Member[]) {
    this.props.members = [...this.props.members, ...members]

    return this
  }

  static create(
    props: Optional<ITeam, "created_at" | "updated_at" | "members">,
    id?: string
  ) {
    const team = new Team(
      {
        ...props,
        members: [],
        created_at: props.created_at ?? new Date().toISOString(),
        updated_at: props.updated_at ?? null,
      },
      id
    );

    return team
  }
}
