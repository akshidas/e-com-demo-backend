import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { RoleRepo } from './role.repo';
import { Role, RoleSchema } from './role.schema';
import { RoleService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RoleRepo, RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
