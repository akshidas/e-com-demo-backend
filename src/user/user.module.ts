import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminMiddleWare from 'src/shared/middlewares/admin.middleware';
import { AddressController } from './address/address.controller';
import { AddressRepo } from './address/address.repo';
import { Address, AddressSchema } from './address/address.schema';
import { AddressService } from './address/address.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [UserController, AddressController],
  providers: [UserRepo, UserService, AddressService, AddressRepo],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleWare).forRoutes({
      path: 'v1/users',
      method: RequestMethod.GET,
    });
  }
}
