import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Category } from '../category.schema';

export class CreateCategoryDto implements Category {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
