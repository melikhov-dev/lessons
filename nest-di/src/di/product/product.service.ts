import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductViewModel } from './product.types';
import { UserService } from '../user/user.service';

export class ProductService {
  constructor(
    private _repository: Repository<Product>,
    private _userService: UserService
  ) {}

  async getFeatured():Promise<ProductViewModel[]> {
    const products = await this._repository.find({ where: { IsFeatured: true} });
    return this._prepareResult(products);
  }

  private _prepareResult(products: Product[]):ProductViewModel[] {
    const isCustomerPreffered = this._userService.isPreffered();
    const discount = isCustomerPreffered ? 0.95 : 1;
    return products.reduce((acc: ProductViewModel[], product: Product) => {
      acc.push({
        name: product.Name,
        price: product.UnitPrice * discount
      });
      return acc;
    }, []);
  }
}

