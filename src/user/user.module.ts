import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from 'src/group/group.module';
import { RoleModule } from 'src/roles/role.module';
import AdminMiddleWare from 'src/shared/middlewares/admin.middleware';
import { AddressController } from './address/address.controller';
import { AddressRepo } from './address/address.repo';
import { Address, AddressSchema } from './address/address.schema';
import { AddressService } from './address/address.service';
import { User, UserSchema } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
    GroupModule,
    RoleModule,
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
