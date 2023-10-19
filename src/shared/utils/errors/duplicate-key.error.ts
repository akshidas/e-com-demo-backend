class DuplicateKeyError {
  public readonly message: string;

  constructor(error) {
    const [k, v] = Object.entries(error.keyValue).find(Boolean);
    this.message = `${k} with value ${v} already exists`;
  }
}

export default DuplicateKeyError;
