import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepo } from 'src/customer/customer.repo';
import { Customer, CustomerSchema } from 'src/customer/customer.schema';
import { CustomerService } from 'src/customer/customer.service';
import { AuthController } from './auth.controller';
import { AuthRepo } from './auth.repo';
import { Auth, AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [CustomerRepo, CustomerService, AuthService, AuthRepo],
})
export class AuthModule {}
