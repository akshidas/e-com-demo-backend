import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Mobile number of the user',
  })
  mobile?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'Email number of the user' })
  email?: string;
}
