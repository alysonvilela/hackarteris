export class BaseObjectValue<Props> {
  protected props: Props

  get flatted(): Props {
    return {
      ...this.props,
    }
  }

  constructor(props: Props) {
    this.props = props
  }
}