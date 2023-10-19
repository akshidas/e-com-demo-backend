import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminMiddleWare from 'src/shared/middlewares/admin.middleware';
import { ProductsController } from './products.controller';
import { ProductsRepo } from './products.repo';
import { Product, ProductSchema } from './products.schema';
import { ProductsService } from './products.service';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ImagesModule,
  ],

  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleWare).forRoutes('v1/products');
  }
}
