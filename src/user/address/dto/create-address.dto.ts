import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../address.schema';

export class CreateAddressDto implements Address {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;
}
