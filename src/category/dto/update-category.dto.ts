import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import { Category } from '../category.schema';

export class UpdateCategoryDto implements Category {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  deleted_at?: Date;
  updated_at?: Date;
}
