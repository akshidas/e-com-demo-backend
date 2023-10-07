import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerRepo {
  constructor(@InjectModel(Customer.name) private userModel: Model<Customer>) {}

  async getAllUsers() {
    try {
      return await this.userModel.find();
    } catch (err) {
      throw new InternalServerErrorException('something went wrong');
    }
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const createdUser = new this.userModel(createCustomerDto);
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
    return await this.userModel.findOne({ email }, ['password', 'isAdmin']);
  }

  async updateUser(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateCustomerDto, updated_at: now() },
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
