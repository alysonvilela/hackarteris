import { BaseEntity } from "../../core/base/entity";
import { Optional } from "../../utils/optional";
import { IReflectorMeasurements, ReflectorMeasurements } from "./object-values.ts/reflectometer-measurements";

export type ReflectorColor = "YELLOW" | "WHITE" | "BROWN" | "GREEN" | "RED" | "BLUE"
export type ReflectorDirection = "NORTH" | "SOUTH"

export interface IReflector {
  work_id: string;
  kilometer_position: string;
  direction: ReflectorDirection;

  code: string;
  measurements: ReflectorMeasurements[]
  created_at: string
}

export class Reflector extends BaseEntity<IReflector> {

  static create(
    props: Optional<IReflector, "created_at">,
    id?: string
  ) {
    const reflector = new Reflector(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
      },
      id
    );

    return reflector
  }
}