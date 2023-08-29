import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/e-com'),
    UserModule,
    RouterModule.register([{ path: 'users', module: UserModule }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
