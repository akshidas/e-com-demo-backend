import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';
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

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsOptional()
  @IsNumber()
  category_id: Types.ObjectId;

  @IsOptional()
  deleted_at?: Date;
}
