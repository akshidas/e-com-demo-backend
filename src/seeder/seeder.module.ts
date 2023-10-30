import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from 'src/group/group.module';
import { Group, GroupSchema } from 'src/group/group.schema';
import { GroupService } from 'src/group/group.service';
import { RoleModule } from 'src/roles/role.module';
import { RoleRepo } from 'src/roles/role.repo';
import { Role, RoleSchema } from 'src/roles/role.schema';
import { RoleService } from 'src/roles/roles.service';
import { User, UserSchema } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserRepo } from 'src/user/user.repo';
import { UserService } from 'src/user/user.service';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const DB_URL = config.get('DATABASE_URL');
        return {
          autoIndex: true,
          uri: DB_URL,
        };
      },
    }),
    RoleModule,
    UserModule,
    GroupModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  providers: [SeederService, UserService, UserRepo, RoleService, RoleRepo],
})
export class SeederModule {}
