import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
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

  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    const product = await this.productService.getOne(slug);
    return { data: product };
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

  @Put(':slug')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('slug') slug: string,
  ) {
    try {
      const savedProduct = await this.productService.updateProduct(
        slug,
        updateProductDto,
      );
      if (savedProduct) return { data: savedProduct };
    } catch (err) {
      if (err instanceof DuplicateKeyError)
        throw new ConflictException(err.message);
      if (err instanceof NotFoundException)
        throw new NotFoundException(err.message);
      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete(':slug')
  async deleteProduct(@Param('slug') slug: string) {
    try {
      const product = await this.productService.deleteProduct(slug);
      if (product) return { data: product };
    } catch (err) {
      if (err instanceof DuplicateKeyError)
        throw new ConflictException(err.message);
      if (err instanceof NotFoundException)
        throw new NotFoundException(err.message);
      throw new InternalServerErrorException(err.message);
    }
  }
}
