import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartRepo } from './cart.repo';
import { Cart, CartSchema } from './cart.schema';
import { CartService } from './cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartRepo, CartService],
})
export class CartModule {}
