import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepo } from 'src/user/user.repo';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthRepo } from './auth.repo';
import { Auth, AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [UserRepo, UserService, AuthService, AuthRepo],
})
export class AuthModule {}
