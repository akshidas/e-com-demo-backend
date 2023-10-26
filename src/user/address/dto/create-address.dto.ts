import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User address' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'First name of the user who this address belongs to',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Last name of the user who this address belongs to',
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pincode for where the address is located',
  })
  pincode: string;
}
