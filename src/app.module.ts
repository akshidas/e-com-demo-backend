import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/e-com'),
    CustomerModule,
    AuthModule,
    CategoryModule,
    RouterModule.register([
      { path: 'users', module: CustomerModule },
      { path: 'auth', module: AuthModule },
      { path: 'category', module: CategoryModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
