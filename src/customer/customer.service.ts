import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import genJwt from 'src/shared/utils/gen-jwt';
import { CustomerRepo } from './customer.repo';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepo) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const createdUser = await this.customerRepo.create(createCustomerDto);
    return await genJwt({ id: createdUser.id });
  }

  async getUserByEmail(id: string) {
    const user = await this.customerRepo.getUserById(id);
    if (user === null) throw new NotFoundException(`user does not exist`);
    return user;
  }

  async updateUser(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      return this.customerRepo.updateUser(id, updateCustomerDto);
    } catch (err) {
      throw new InternalServerErrorException('failed to update user');
    }
  }

  async getUserPasswordByEmail(email: string) {
    const user = await this.customerRepo.getUserPasswordByEmail(email);
    if (user === null)
      throw new NotFoundException(`user with email ${email} not found`);
    return user;
  }

  async deleteUserById(id: string) {
    return await this.customerRepo.deleteOne(id);
  }
}
