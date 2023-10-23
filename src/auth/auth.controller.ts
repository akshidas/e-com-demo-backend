import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginUserDto from './login-user.dto';

@ApiTags('auth')
@Controller({ version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);
    if (token) {
      return { data: token };
    }

    throw new InternalServerErrorException('something went wrong');
  }
}
