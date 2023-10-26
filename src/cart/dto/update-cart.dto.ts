import { PartialType, PickType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(
  PickType(CreateCartDto, ['quantity']),
) {}
