import { Injectable } from '@nestjs/common';
import { CartRepo } from './cart.repo';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepo) {}
  async getCartByUserId(uid: string) {
    return await this.cartRepo.getAllOfUser(uid);
  }
  async create(user: string, createCartDto: CreateCartDto) {
    const { product } = createCartDto;
    const cart = await this.cartRepo.cartEntryExist(user, product);
    if (cart) {
      const { id, quantity } = cart;
      return await this.updateCart(id, { quantity: quantity + 1 });
    }
    return await this.cartRepo.create({ ...createCartDto, user });
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartRepo.updatedCartCount(id, updateCartDto);
  }

  async deleteCart(id: string) {
    return await this.cartRepo.deleteCart(id);
  }
}
