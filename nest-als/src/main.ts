import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoLoggerService } from './logger/pino-logger.service';
import { ASYNC_STORAGE } from './logger/logger.constants';
import { v4 as uuidv4 } from 'uuid';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });

  app.use((req, res, next) => {
    const asyncStorage = app.get(ASYNC_STORAGE);
    const traceId = req.headers['x-request-id'] || uuidv4();
    const store = new Map().set('traceId', traceId);
    asyncStorage.run(store, () => {
      next();
    });
  });

  app.useLogger(app.get(PinoLoggerService));
  await app.listen(3000);
}
bootstrap();
