import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [LoggerModule],
})
export class AppModule {}
