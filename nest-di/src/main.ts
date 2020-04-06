import { NestFactory } from '@nestjs/core';
import type {NestExpressApplication} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, 'views'));

  app.set('view engine', 'js');
  app.engine('js', require('express-react-views').createEngine({transformViews: false}));

  await app.listen(3000);
}
bootstrap();
