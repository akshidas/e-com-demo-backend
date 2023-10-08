import { MiddlewareConsumer, Module } from '@nestjs/common';
import AdminMiddleWare from 'src/shared/middlewares/admin.middleware';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepo } from './category.repo';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepo],
})
export class CategoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleWare).forRoutes('v1/categories');
  }
}
