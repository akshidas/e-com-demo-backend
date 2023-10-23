import { Module } from '@nestjs/common';
import { CartRepo } from './cart.repo';

@Module({
  providers: [CartRepo]
})
export class CartModule {}
