import { Injectable } from '@nestjs/common';
import { AddressRepo } from './address.repo';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepo: AddressRepo) {}

  async create(createAddressDto: CreateAddressDto) {}
}
