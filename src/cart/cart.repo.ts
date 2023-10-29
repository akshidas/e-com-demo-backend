import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Cart } from './cart.schema';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';

@Injectable()
export class CartRepo {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(createCartDto: CreateCartDto) {
    const cart = new this.cartModel(createCartDto);
    return await cart.save();
  }

  async getAllOfUser(uid: string) {
    const carts = await this.cartModel.find({ user: uid });
    return carts;
  }

  async checkCartExistsWithUserId(id: string, uid: string) {
    const cart = await this.cartModel.exists({ _id: id, user: uid });
    return Boolean(cart);
  }

  async cartEntryExist(uid: string, pid: string) {
    const exists = await this.cartModel.findOne({
      user: uid,
      product: pid,
    });

    return exists;
  }

  async updatedCartCount(id: string, updateCartDto: UpdateCartDto) {
    try {
      const updatedCart = await this.cartModel.findOneAndUpdate(
        { _id: id },
        {
          ...updateCartDto,
          updated_at: now(),
        },
        { returnOriginal: false },
      );
      return updatedCart;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteCart(id: string) {
    return await this.cartModel.findByIdAndDelete(id);
  }
}
