import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepo } from 'src/products/products.repo';
import { Product, ProductSchema } from 'src/products/products.schema';
import { ProductsService } from 'src/products/products.service';
import { UserRepo } from 'src/user/user.repo';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    SeederService,
    UserService,
    UserRepo,
    ProductsService,
    ProductsRepo,
  ],
})
export class SeederModule {}
