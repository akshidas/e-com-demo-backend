import { Injectable, NotFoundException } from '@nestjs/common';
import { isValidObjectId, now } from 'mongoose';
import { CreateProductsDto, UpdateProductDto } from './dto/products.dto';
import { ProductsRepo } from './products.repo';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepo) {}
  async insertMany(productList: CreateProductsDto[]) {
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

  async createProduct(createProductDto: CreateProductsDto) {
    return this.productRepo.createProduct(createProductDto);
  }

  private async identifyParamAndUpdate(
    slug: string,
    updateProductDto: UpdateProductDto,
  ) {
    return isValidObjectId(slug)
      ? this.productRepo.updateProductById(slug, updateProductDto)
      : this.productRepo.updateProductBySlug(slug, updateProductDto);
  }

  async updateProduct(slug: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.identifyParamAndUpdate(
      slug,
      updateProductDto,
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
      } as UpdateProductDto);

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
