import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from 'src/images/image.schema';
import AdminMiddleWare from 'src/shared/middlewares/admin.middleware';
import { ProductsController } from './products.controller';
import { ProductsRepo } from './products.repo';
import { Product, ProductSchema } from './products.schema';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleWare)
      .exclude(
        { path: 'v1/products', method: RequestMethod.GET },
        { path: 'v1/products/:slug', method: RequestMethod.GET },
      )
      .forRoutes('v1/products');
  }
}
