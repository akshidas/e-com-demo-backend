import { Injectable, UnauthorizedException } from '@nestjs/common';
import genJwt from 'src/shared/utils/gen-jwt';
import verifyPassword from 'src/shared/utils/verify-password';
import { UserService } from 'src/user/user.service';
import LoginUserDto from './login-user.dto';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);

    const isMatch = await verifyPassword(loginUserDto.password, user.password);

    if (isMatch) return await genJwt({ email: user.email });

    throw new UnauthorizedException('passwords do not match');
  }
}
