import { Controller, Get } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller({ version: '1' })
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get()
  async getAll() {
    return 'all';
  }
}
