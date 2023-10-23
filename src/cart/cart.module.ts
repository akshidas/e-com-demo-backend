import { Module } from '@nestjs/common';
import { CartRepo } from './cart.repo';
import { CartService } from './cart.service';

@Module({
  providers: [CartRepo, CartService]
})
export class CartModule {}
