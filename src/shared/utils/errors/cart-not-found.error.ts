class CartNotFoundError {
  public readonly message: string;

  constructor(id: string) {
    this.message = `cart with id ${id} does not exist`;
  }
}

export default CartNotFoundError;
