import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export default LoginUserDto;
