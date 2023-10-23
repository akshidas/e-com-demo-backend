import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { CartService } from '../cart.service';

@Injectable()
class UserOwnsCart implements NestMiddleware {
  constructor(private readonly cartService: CartService) {}
  async use(req, res: Response, next: NextFunction) {
    const cartBelongsToUser = await this.cartService.cartBelongToUser(
      req.params.id,
      req.id,
    );
    if (!cartBelongsToUser)
      throw new NotFoundException(`cart with id ${req.params.id} not found`);
    next();
  }
}

export default UserOwnsCart;
