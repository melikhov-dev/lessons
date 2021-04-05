import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AsyncStorageService } from './async-storage/async-storage.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth.interceptor';
import { HttpRequestService } from './http-request/http-request.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AsyncStorageService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    HttpRequestService,
  ],
})
export class AppModule {}
