import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserRepo {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (err) {
      if (err.code === 11000) {
        const [key, value] = Object.entries(err.keyValue).flat();
        throw new ConflictException(`user with ${key} ${value} already exists`);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  async getUserById(id: string) {
    const user = await this.userModel.findOne({ _id: id, deleted_at: null }, [
      '-password',
      '-deleted_at',
    ]);

    return user;
  }

  async getUserPasswordByEmail(email: string) {
    const password = await this.userModel.findOne({ email }, 'password');
    return password;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserDto, updated_at: now() },
    );

    if (updatedUser) {
      return await this.userModel.findById(updatedUser.id, [
        '-password',
        '-deleted_at',
      ]);
    } else throw new NotFoundException(`user not found`);
  }

  async deleteOne(id: string) {
    const deletedUser = await this.userModel.findByIdAndUpdate(id, {
      deleted_at: now(),
    });
    if (deletedUser === null) throw new NotFoundException('user not found');
    return true;
  }
}
