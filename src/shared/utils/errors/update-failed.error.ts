import { isValidObjectId } from 'mongoose';

class UpdateFailedError {
  public readonly message: string;

  constructor(slug) {
    this.message = isValidObjectId(slug)
      ? `failed to update product with id ${slug}`
      : `failed to update product with slug ${slug}`;
  }
}

export default UpdateFailedError;
