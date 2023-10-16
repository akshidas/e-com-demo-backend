import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { ProductsRepo } from './products.repo';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepo) {}

  async createProduct(createProductDto: CreateProductsDto) {
    return this.productRepo.createProduct(createProductDto);
  }
}