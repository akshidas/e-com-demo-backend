import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Id of the product to be added to cart' })
  product: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Id of the user whose cart tis belongs to' })
  user: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty({ description: 'Quantity of the product to be added to cart' })
  quantity: number;
}

export class UpdateCartDto extends PartialType(
  PickType(CreateCartDto, ['quantity']),
) {}
