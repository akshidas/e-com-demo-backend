import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john.doe@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Mobile number of the user' })
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Email number of the user' })
  password: string;
}
