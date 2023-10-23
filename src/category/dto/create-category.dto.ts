import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/)
  @ApiProperty()
  slug: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  status: boolean;
}
