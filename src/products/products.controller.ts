import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { ProductsService } from './products.service';

@Controller({
  version: '1',
})
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  async createProduct(@Body() createProductDto: CreateProductsDto) {
    try {
      const savedProduct = await this.productService.createProduct(
        createProductDto,
      );

      return { data: savedProduct };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('something went wrong');
    }
  }
}
