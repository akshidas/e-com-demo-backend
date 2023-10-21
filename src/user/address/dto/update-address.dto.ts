import { IsOptional, IsString } from 'class-validator';
import { Address } from '../address.schema';

export class UpdateAddressDto implements Address {
  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  pincode: string;
}
