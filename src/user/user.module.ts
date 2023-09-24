import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AddressModule,
  ],
  controllers: [UserController],
  providers: [UserRepo, UserService],
})
export class UserModule {}
