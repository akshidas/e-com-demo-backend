import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
    .then(async (appContext) => {
      const seeder = appContext.get(SeederService);
      try {
        await seeder.seedUser();
      } catch (err) {
        throw err;
      } finally {
        appContext.close();
      }
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
