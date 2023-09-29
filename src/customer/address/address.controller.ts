import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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
  async create(@Req() req, @Body() createAddressDto: CreateAddressDto) {
    const savedAddress = await this.addressService.create(
      createAddressDto,
      req.id,
    );

    return { data: savedAddress };
  }
}
