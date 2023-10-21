import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesRepo } from './role.repo';
import { Role, RoleSchema } from './role.schema';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RolesRepo, RolesService],
  controllers: [RolesController],
})
export class RoleModule {}
