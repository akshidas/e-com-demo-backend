import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../address/address.schema';
import { Customer } from '../customer.schema';

export class CreateCustomerDto implements Customer {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
