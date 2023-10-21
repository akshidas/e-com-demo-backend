import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddressRepo } from './address.repo';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepo: AddressRepo) {}
  async getAddressByUserId(userId: string) {
    return this.addressRepo.getAllAddressOfUserById(userId);
  }
  async create(createAddressDto: CreateAddressDto, userId: string) {
    return await this.addressRepo.create(createAddressDto, userId);
  }

  async updateById(
    addressId: Types.ObjectId,
    updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressRepo.updateById(addressId, updateAddressDto);
  }

  async deleteOneById(addressId: Types.ObjectId) {
    return await this.addressRepo.deleteOneById(addressId);
  }
}
