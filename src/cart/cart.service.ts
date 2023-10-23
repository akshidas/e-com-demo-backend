import { Injectable } from '@nestjs/common';
import { CartRepo } from './cart.repo';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepo) {}

  async create(createCartDto: CreateCartDto) {
    const { product, user } = createCartDto;
    const cart = await this.cartRepo.cartEntryExist(user, product);
    if (cart) {
      const { id, quantity } = cart;
      return await this.updateCart(id, { quantity: quantity + 1 });
    }
    return await this.cartRepo.create(createCartDto);
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartRepo.updatedCartCount(id, updateCartDto);
  }

  async deleteCart(id: string) {
    return await this.cartRepo.deleteCart(id);
  }
}
