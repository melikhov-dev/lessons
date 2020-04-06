import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';

@Module({
  controllers: [ProductController]
})
export class NoDiModule {}
