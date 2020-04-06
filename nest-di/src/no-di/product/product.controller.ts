import { Controller, Get, Render, Query } from '@nestjs/common';
import {ProductService} from './product.service';

@Controller('no-di/product')
export class ProductController {
  private _productService;
  constructor() {
    this._productService = new ProductService();
    this._productService.init();
  }

  @Get('featured')
  @Render('no-di')
  async getFeatured(@Query() query: {preffered: string}) {
    const isCustomerPreffered = query.preffered === 'true';
    const products = await this._productService.getFeatured(isCustomerPreffered);
    return {products} ;
  }
}
