import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Image } from 'src/images/image.schema';
import { CreateProductsDto } from './create-products.dto';

export class UpdateProductDto extends PartialType(CreateProductsDto) {
  deleted_at?: Date;
}
