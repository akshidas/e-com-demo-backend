import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import genJwt from 'src/shared/utils/gen-jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userRepo.create(createUserDto);
    return await genJwt({ email: createdUser.email });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.getUserByEmail(email);
    if (user === null)
      throw new NotFoundException(`user with email ${email} does not exist`);
    return user;
  }

  async updateUser(email: string, updatedUserDto: UpdateUserDto) {
    try {
      return this.userRepo.updateUser(email, updatedUserDto);
    } catch (err) {
      throw new InternalServerErrorException('failed to update user');
    }
  }

  async getUserPasswordByEmail(email: string) {
    const user = await this.userRepo.getUserPasswordByEmail(email);

    if (user === null)
      throw new InternalServerErrorException(`something went wrong`);
    return user;
  }
}
