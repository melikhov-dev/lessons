import { Controller, Get, Render, Query } from '@nestjs/common';
import {ProductService} from './product.service';

@Controller('di/product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Get('featured')
  @Render('di')
  async getFeatured() {
    const products = await this._productService.getFeatured();
    return {products} ;
  }
}
