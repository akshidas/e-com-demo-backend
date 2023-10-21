import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import genJwt from 'src/shared/utils/gen-jwt';
import verifyPassword from 'src/shared/utils/verify-password';
import { UserService } from 'src/user/user.service';
import { AuthRepo } from './auth.repo';
import LoginUserDto from './login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly authRepo: AuthRepo,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, id } = await this.userService.getUserPasswordByEmail(
      loginUserDto.email,
    );

    const isMatch = await verifyPassword(loginUserDto.password, password);

    if (isMatch) {
      const timeLogged = await this.authRepo.create(id);
      if (timeLogged) {
        return await genJwt({ id });
      } else {
        throw new InternalServerErrorException(
          'Failed to save user login time',
        );
      }
    }

    throw new UnauthorizedException('passwords do not match');
  }
}
