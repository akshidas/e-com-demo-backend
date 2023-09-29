import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  mobile: string;

  @IsEmail()
  @IsOptional()
  email: string;
}