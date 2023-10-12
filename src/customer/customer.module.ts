import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminMiddleWare from 'src/shared/middlewares/admin.middleware';
import { AddressController } from './address/address.controller';
import { AddressRepo } from './address/address.repo';
import { Address, AddressSchema } from './address/address.schema';
import { AddressService } from './address/address.service';
import { CustomerController } from './customer.controller';
import { CustomerRepo } from './customer.repo';
import { Customer, CustomerSchema } from './customer.schema';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [CustomerController, AddressController],
  providers: [CustomerRepo, CustomerService, AddressService, AddressRepo],
})
export class CustomerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleWare).forRoutes({
      path: 'v1/users',
      method: RequestMethod.GET,
    });
  }
}
