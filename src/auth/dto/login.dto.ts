import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginUserRequest {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'email used to register' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'password used while registering' })
  password: string;
}

export class LoggedInSuccessResponse {
  token: string;
}

export default LoginUserRequest;
