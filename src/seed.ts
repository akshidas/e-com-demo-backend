import { NestFactory } from '@nestjs/core';
import { CreateRoleDto } from './roles/dto/create-role.dto';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

const adminRole: CreateRoleDto = {
  name: 'admin',
  description: 'role for admin',
};

const sellerRole: CreateRoleDto = {
  name: 'seller',
  description: 'role for admin',
};

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const seeder = appContext.get(SeederService);
      try {
        await seeder.seedRole(adminRole, 'seeded admin role');
        await seeder.seedRole(sellerRole, 'seeded seller role');
        await seeder.seedUser();
      } catch (err) {
        console.log(err);
      } finally {
        appContext.close();
      }
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
