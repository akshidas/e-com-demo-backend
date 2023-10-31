import { Injectable } from '@nestjs/common';
import CartNotFoundError from 'src/shared/utils/errors/cart-not-found.error';
import { CartRepo } from './cart.repo';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepo) {}

  async cartBelongToUser(id: string, uid: string) {
    return await this.cartRepo.checkCartExistsWithUserId(id, uid);
  }

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
    return await this.cartRepo.create(user, createCartDto);
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepo.updatedCartCount(id, updateCartDto);
    if (cart) return cart;
    throw new CartNotFoundError(id);
  }

  async deleteCart(id: string) {
    return await this.cartRepo.deleteCart(id);
  }
}
