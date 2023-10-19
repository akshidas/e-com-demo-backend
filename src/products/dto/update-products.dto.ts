import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';
import { Image } from 'src/images/image.schema';
import { Product } from '../products.schema';

export class UpdateProductDto implements Product {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  images: Image[];

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsOptional()
  @IsString()
  category_id: Types.ObjectId;

  @IsOptional()
  deleted_at?: Date;
}
