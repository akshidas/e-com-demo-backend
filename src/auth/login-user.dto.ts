import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import exp from 'constants';

class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export default LoginUserDto;
