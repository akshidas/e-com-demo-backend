import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginUserRequest, { LoggedInSuccessResponse } from './dto/login.dto';

@ApiTags('auth')
@Controller({ version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'get the access token of a user' , })
  @ApiOkResponse({
    description: 'successfully logged in the user',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong with the server',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials passed' })
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserRequest,
  ): Promise<LoggedInSuccessResponse> {
    const token = await this.authService.login(loginUserDto);
    if (token) {
      return { data: token };
    }

    throw new InternalServerErrorException('something went wrong');
  }
}
