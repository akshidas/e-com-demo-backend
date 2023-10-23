import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  product: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  user?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty()
  quantity: number;
}
