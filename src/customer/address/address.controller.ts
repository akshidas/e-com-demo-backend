import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  async getAll(@Req() req) {
    try {
      const addresses = await this.addressService.getAddressByCustomerId(
        req.id,
      );

      return { data: addresses };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException(err.message);
    }
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
