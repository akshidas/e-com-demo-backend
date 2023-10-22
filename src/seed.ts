import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const seeder = appContext.get(SeederService);
      try {
        await seeder.seedRole();
        await seeder.seedUser();
        await seeder.seedGroup();
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
