import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { isValidObjectId, now } from 'mongoose';
import { CreateProductRequest, UpdateProductRequest } from './dto/products.dto';
import { ProductsRepo } from './products.repo';
import { Product } from './products.schema';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepo) {}
  async insertMany(productList: CreateProductRequest[]) {
    return this.productRepo.insertMany(productList);
  }
  async getAll() {
    return this.productRepo.getAll();
  }

  async getOne(slug: string) {
    if (isValidObjectId(slug)) {
      return this.productRepo.getOneById(slug);
    } else {
      return this.productRepo.getOneBySlug(slug);
    }
  }

  async createProduct(createProductDto: CreateProductRequest) {
    const product = plainToClass(Product, createProductDto);

    const createdProduct = await this.productRepo.createProduct(product);
    return createdProduct;
  }

  private async identifyParamAndUpdate(
    slug: string,
    UpdateProductRequest: UpdateProductRequest,
  ) {
    return isValidObjectId(slug)
      ? this.productRepo.updateProductById(slug, UpdateProductRequest)
      : this.productRepo.updateProductBySlug(slug, UpdateProductRequest);
  }

  async updateProduct(
    slug: string,
    UpdateProductRequest: UpdateProductRequest,
  ) {
    const updatedProduct = await this.identifyParamAndUpdate(
      slug,
      UpdateProductRequest,
    );

    if (updatedProduct) {
      return updatedProduct;
    }
    throw new NotFoundException('product not found');
  }

  async deleteProduct(slug: string) {
    try {
      const deletedProduct = await this.identifyParamAndUpdate(slug, {
        deleted_at: now(),
      } as UpdateProductRequest);

      if (deletedProduct) {
        return deletedProduct;
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        return true;
      }
    }
  }
}
