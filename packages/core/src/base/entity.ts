import {ulid} from 'ulidx'

export type Flatted<T> = T & {
  id: string
}

export class BaseEntity<Props> {
  private _id: string
  protected props: Props

  get id() {
    return this._id
  }

  get flatted(): Flatted<Props> {
    return {
      id: this.id,
      ...this.props,
    }
  }

  constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? ulid();
  }
}