class EntityNotFound {
  public readonly message: string;

  constructor(slug: string) {
    this.message = `role with value ${slug} does not exist`;
  }
}

export default EntityNotFound;
