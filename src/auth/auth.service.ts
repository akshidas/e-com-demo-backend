import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepo } from 'src/user/user.repo';
import genJwt from 'src/utils/gen-hwt';
import verifyPassword from 'src/utils/verify-password';
import LoginUserDto from './login-user.dto';
@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepo) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepo.getUserByEmail(loginUserDto.email);
    if (user === null)
      throw new NotFoundException(
        `user with email ${loginUserDto.email} does not exist`,
      );
    const isMatch = await verifyPassword(loginUserDto.password, user.password);

    if (isMatch) {
      return await genJwt({ email: user.email });
    }
    throw new UnauthorizedException('passwords do not match');
  }
}
