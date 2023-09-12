import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import genJwt from 'src/utils/gen-hwt';
import verifyPassword from 'src/utils/verify-password';
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
