import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepo } from 'src/user/user.repo';
import genJwt from 'src/utils/gen-hwt';
import verifyPassword from 'src/utils/vafify-password';

class LoginUserDto {
  email: string;
  password: string;
}

@Controller()
export class AuthController {
  constructor(private userRepo: UserRepo) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userRepo.getUserByEmail(loginUserDto.email);
    if (user === null)
      throw new NotFoundException(
        `user with email ${loginUserDto.email} does not exist`,
      );
    const isMatch = await verifyPassword(loginUserDto.password, user.password);

    if (isMatch) {
      const token = await genJwt({ email: user.email });
      return { data: token };
    }

    throw new UnauthorizedException('passwords do not match');
  }
}
