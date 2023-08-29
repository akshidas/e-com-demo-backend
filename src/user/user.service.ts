import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userRepo.create(createUserDto);
      return createdUser;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to save User');
    }
  }
}
