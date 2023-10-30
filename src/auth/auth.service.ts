import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GroupService } from 'src/group/group.service';
import genJwt from 'src/shared/utils/gen-jwt';
import verifyPassword from 'src/shared/utils/verify-password';
import { UserService } from 'src/user/user.service';
import { AuthRepo } from './auth.repo';
import LoginUserRequest from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly authRepo: AuthRepo,
    private readonly groupService: GroupService,
  ) {}

  async login(loginUserDto: LoginUserRequest): Promise<string> {
    const { password, id } = await this.userService.getUserPasswordByEmail(
      loginUserDto.email,
    );

    const isMatch = await verifyPassword(loginUserDto.password, password);

    if (isMatch) {
      const isAdmin = await this.groupService.isAdmin(id);
      const timeLogged = await this.authRepo.create(id);
      if (timeLogged) {
        return await genJwt({ id, isAdmin: isAdmin });
      }
    }

    throw new UnauthorizedException('passwords do not match');
  }
}
