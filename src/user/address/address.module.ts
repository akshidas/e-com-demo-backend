import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressRepo } from './address.repo';

@Module({
  controllers: [AddressController],
  providers: [AddressRepo],
})
export class AddressModule {}
