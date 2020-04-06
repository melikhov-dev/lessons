import { Module } from '@nestjs/common';
import { NoDiModule } from './no-di/no-di.module';
import { DiModule } from './di/di.module';

@Module({
  imports: [NoDiModule, DiModule]
})
export class AppModule {}
