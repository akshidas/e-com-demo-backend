import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddressRepo } from './address.repo';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepo: AddressRepo) {}
  async getAddressByCustomerId(userId: string) {
    return this.addressRepo.getAllAddressOfCustomerById(userId);
  }
  async create(createAddressDto: CreateAddressDto, userId: string) {
    return await this.addressRepo.create(createAddressDto, userId);
  }

  async deleteOneById(addressId: Types.ObjectId) {
    return await this.addressRepo.deleteOneById(addressId);
  }
}
