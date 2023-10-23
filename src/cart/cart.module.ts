import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartRepo } from './cart.repo';
import { Cart, CartSchema } from './cart.schema';
import { CartService } from './cart.service';
import UserOwnsCart from './middlewares/user-owns-cart.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartRepo, CartService],
})
export class CartModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserOwnsCart).forRoutes('v1/carts/:id');
  }
}
