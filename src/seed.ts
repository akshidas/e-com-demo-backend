import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const seeder = appContext.get(SeederService);
      try {
        await seeder.seedUser();
        await seeder.seedRole();
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
