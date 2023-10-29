import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login.dto';

@ApiTags('auth')
@Controller({ version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'successfully logged in the user',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong with the server',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials passed' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);
    if (token) {
      return { data: token };
    }

    throw new InternalServerErrorException('something went wrong');
  }
}
