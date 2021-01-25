import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as pinoLogger from 'pino';
import { ASYNC_STORAGE } from './logger.constants';
import { AsyncLocalStorage } from 'async_hooks';
const pino = pinoLogger({
  prettyPrint: true,
});

@Injectable()
export class PinoLoggerService implements LoggerService {
  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
  ) {}

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  error(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    pino.error({ traceId }, this.getMessage(message, context));
    if (trace) {
      pino.error(trace);
    }
  }

  log(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    pino.info({ traceId }, this.getMessage(message, context));
  }

  warn(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    pino.warn({ traceId }, this.getMessage(message, context));
  }
}
