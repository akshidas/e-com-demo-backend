import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { CreateProductsDto } from './dto/create-products.dto';
import { ConvertSlug } from './product-slug-transform.pipe';
import { ProductsService } from './products.service';

@Controller({
  version: '1',
})
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAll() {
    try {
      const products = await this.productService.getAll();
      return { data: products };
    } catch (err) {
      throw new InternalServerErrorException('something went wrong');
    }
  }

  @Post()
  @UsePipes(new ConvertSlug())
  async createProduct(@Body() createProductDto: CreateProductsDto) {
    try {
      const savedProduct = await this.productService.createProduct(
        createProductDto,
      );

      return { data: savedProduct };
    } catch (err) {
      if (err instanceof DuplicateKeyError)
        throw new ConflictException(err.message);
      throw new InternalServerErrorException('something went wrong');
    }
  }
}
