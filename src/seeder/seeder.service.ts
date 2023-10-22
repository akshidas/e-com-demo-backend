import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { UserService } from 'src/user/user.service';
import _products from './data/_product.json';
import _users from './data/_user.json';
@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductsService,
  ) {}
  async seedUser() {
    try {
      await this.userService.insertMultipleUsers(_users);
      console.log('finished seeding');
    } catch (err) {
      if (err instanceof DuplicateKeyError) {
        console.log('already seeded');
        return;
      }

      console.log(err.message);
    }
  }

  async seedProduct() {
    try {
      // await this.productService.insertMany(_products);
      console.log('first');
    } catch (err) {
      console.log(err);
    }
  }
}
