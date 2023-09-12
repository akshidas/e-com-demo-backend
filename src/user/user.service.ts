import { Injectable, NotFoundException } from '@nestjs/common';
import genJwt from 'src/utils/gen-hwt';
import { CreateUserDto } from './dto/create-user.dto';
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
}
