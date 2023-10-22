class DuplicateKeyError {
  public readonly message: string;

  constructor(error) {
    if (typeof error === 'string') {
      this.message = error;
      return;
    }
    const [k, v] = Object.entries(error.keyValue).find(Boolean);
    this.message = `${k} with value ${v} already exists`;
  }
}

export default DuplicateKeyError;
