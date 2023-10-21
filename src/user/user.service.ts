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

  async getAll() {
    return this.userRepo.getAllUsers();
  }
  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userRepo.create(createUserDto);
    return await genJwt({ id: createdUser.id });
  }

  async getById(id: string) {
    const user = await this.userRepo.getUserById(id);
    if (user === null) throw new NotFoundException(`user does not exist`);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepo.updateUser(id, updateUserDto);
    } catch (err) {
      throw new InternalServerErrorException('failed to update user');
    }
  }

  async getUserPasswordByEmail(email: string) {
    const user = await this.userRepo.getUserPasswordByEmail(email);
    if (user === null)
      throw new NotFoundException(`user with email ${email} not found`);
    return user;
  }

  async deleteUserById(id: string) {
    return await this.userRepo.deleteOne(id);
  }
}
