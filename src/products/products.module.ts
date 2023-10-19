import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminMiddleWare from 'src/shared/middlewares/admin.middleware';
import { ProductsController } from './products.controller';
import { ProductsRepo } from './products.repo';
import { Product, ProductSchema } from './products.schema';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],

  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleWare).forRoutes('v1/products');
  }
}
