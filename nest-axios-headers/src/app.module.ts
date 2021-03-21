import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import {ASYNC_STORAGE} from "./app.constants";
import {AsyncLocalStorage} from "async_hooks";
import { AxiosInterceptorService } from './axios-intercepter/axios-interceptor.service';
const asyncLocalStorage = new AsyncLocalStorage();

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    {
      provide: ASYNC_STORAGE,
      useValue: asyncLocalStorage
    },
    AxiosInterceptorService
  ],
})
export class AppModule {}
