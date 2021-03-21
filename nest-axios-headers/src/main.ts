import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ASYNC_STORAGE} from "./app.constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    const authToken = req.headers?.auth;
    const asyncStorage = app.get(ASYNC_STORAGE);
    const store = new Map();
    store.set("auth", authToken);
    asyncStorage.run(store, () => {
      next();
    })
  })
  await app.listen(3000);
}
bootstrap();
