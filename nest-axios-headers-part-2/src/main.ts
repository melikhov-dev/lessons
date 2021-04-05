import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { AsyncStorageService } from './async-storage/async-storage.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({}));

  app.use((req, res, next) => {
    const asyncStorageService = app.get(AsyncStorageService);
    const asyncStorage = asyncStorageService.getAsyncStorage();
    asyncStorage.run(AsyncStorageService.getInitialStore(), () => {
      next();
    });
  });
  await app.listen(3000);
}
bootstrap();
