import { Controller, Get, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  async getAll() {
    return 'all';
  }

  @Post()
  async create(createAddressDto: CreateAddressDto) {
    const address = await this.addressService.create(createAddressDto);
  }
}
