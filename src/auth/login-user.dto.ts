import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'email used to register' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'password used while registering' })
  password: string;
}
export default LoginUserDto;
