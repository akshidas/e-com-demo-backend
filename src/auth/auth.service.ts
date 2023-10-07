import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import genJwt from 'src/shared/utils/gen-jwt';
import verifyPassword from 'src/shared/utils/verify-password';
import { AuthRepo } from './auth.repo';
import LoginUserDto from './login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private readonly authRepo: AuthRepo,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, id, isAdmin } =
      await this.customerService.getUserPasswordByEmail(loginUserDto.email);

    const isMatch = await verifyPassword(loginUserDto.password, password);

    if (isMatch) {
      const timeLogged = await this.authRepo.create(id);
      if (timeLogged) {
        return await genJwt({ id, isAdmin });
      } else {
        throw new InternalServerErrorException(
          'Failed to save user login time',
        );
      }
    }

    throw new UnauthorizedException('passwords do not match');
  }
}
