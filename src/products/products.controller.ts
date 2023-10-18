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
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
    try {
      const product = await this.productService.getOne(slug);
      return { data: product };
    } catch (err) {
      console.log(err);

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

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
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
