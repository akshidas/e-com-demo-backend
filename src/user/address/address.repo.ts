import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepo } from '../user.repo';
import { Address } from './address.schema';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressRepo {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
    private readonly userRepo: UserRepo,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const createdAddress = new this.addressModel(createAddressDto);
    return createdAddress;
  }
}
