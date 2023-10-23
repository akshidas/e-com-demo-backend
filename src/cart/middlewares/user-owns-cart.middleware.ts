import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
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
      throw new ForbiddenException('this do not belong to you');
    next();
  }
}

export default UserOwnsCart;
