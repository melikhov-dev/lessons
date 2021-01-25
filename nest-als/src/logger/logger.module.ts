import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './logger.constants';
import { PinoLoggerService } from './pino-logger.service';
const asyncLocalStorage = new AsyncLocalStorage();

@Module({
  providers: [
    PinoLoggerService,
    {
      provide: ASYNC_STORAGE,
      useValue: asyncLocalStorage,
    },
  ],
  exports: [PinoLoggerService],
})
export class LoggerModule {}
