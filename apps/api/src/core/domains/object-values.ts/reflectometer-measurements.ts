import { BaseEntity, Flatted } from "../../base/entity";
import { Optional } from "../../../utils/optional";
import { BaseObjectValue } from "../../base/object-value";

export type ReflectorMeasures = [m1: number, m2: number, m3: number, m4: number, m5: number]

export interface IReflectorMeasurements {
  measures: ReflectorMeasures,
  average: number,
  minimum_value: number
}

export class ReflectorMeasurements extends BaseObjectValue<IReflectorMeasurements> {

  static getAverage(measures: ReflectorMeasures) {
    const [m1, m2, m3, m4, m5] = measures
    return (m1 + m2 + m3 + m4 + m5) / 5
  }

  static create(
    props: Optional<IReflectorMeasurements, 'average'>,
  ) {


    const reflectormeasurements = new ReflectorMeasurements(
      {
        ...props,
        average: props.average ?? this.getAverage(props.measures) 
      }
    );

    return reflectormeasurements
  }
}
