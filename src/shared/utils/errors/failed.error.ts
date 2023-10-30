class Failure {
  public readonly message: string;
  public readonly err: any;
  constructor(err) {
    this.message = err.message;
    this.err = err;
  }
}

export default Failure;
