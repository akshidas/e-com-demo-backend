import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CartNotFoundError from 'src/shared/utils/errors/cart-not-found.error';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('carts')
@ApiBearerAuth()
@Controller({ version: '1' })
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get()
  async getAll(@Req() req) {
    try {
      const carts = await this.cartService.getCartByUserId(req.id);
      return { data: carts };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Post()
  async create(@Body() createCartDto: CreateCartDto, @Req() req) {
    try {
      const cart = await this.cartService.create(req.id, createCartDto);
      if (cart) {
        return { data: cart };
      }
      throw new NotFoundException('cart not found');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Put(':id')
  async updateCart(
    @Body() updateCartDto: UpdateCartDto,
    @Param('id') id: string,
  ) {
    try {
      const cart = await this.cartService.updateCart(id, updateCartDto);
      if (cart) {
        return { data: cart };
      }
    } catch (err) {
      if (err instanceof CartNotFoundError) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete(':id')
  async deleteCart(@Param('id') id: string) {
    try {
      const cart = await this.cartService.deleteCart(id);
      if (cart) {
        return { data: cart };
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
