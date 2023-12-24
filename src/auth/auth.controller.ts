import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import EntityNotFound from 'src/shared/utils/errors/entity-not-found.error';
import UnAuthorizedUser from 'src/shared/utils/errors/unauthorize-user';
import { AuthService } from './auth.service';
import LoginUserRequest from './dto/login.dto';

@ApiTags('auth')
@Controller({ version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'get the access token of a user' })
  @ApiOkResponse({
    description: 'successfully logged in the user',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong with the server',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials passed' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserRequest) {
    try {
      const token = await this.authService.login(loginUserDto);
      if (token) {
        return token;
      }
      throw new Error();
    } catch (err) {
      if (err instanceof EntityNotFound) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof UnAuthorizedUser) {
        throw new UnauthorizedException(err.message);
      }
      throw new InternalServerErrorException('something went wrong');
    }
  }
}
