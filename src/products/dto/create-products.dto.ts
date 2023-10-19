import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';
import { Image } from 'src/images/image.schema';
import { Product } from '../products.schema';

export class CreateProductsDto implements Product {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsArray()
  images: Image[];

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  category_id: Types.ObjectId;
}
