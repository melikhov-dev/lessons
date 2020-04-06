import { createConnection, ConnectionOptions, Repository } from 'typeorm';
import { Product } from './product.entity';
import { join } from 'path';

const options: ConnectionOptions = {
  type: "sqlite",
  database: join(__dirname, '..', '..', '..', 'data', 'di.sqlite'),
  entities: [ Product ],
  logging: true
};

export class ProductService {
  private _repository: Repository<Product>;

  init() {
    return createConnection(options)
      .then(connection => {
        this._repository = connection.getRepository(Product);
      })
      .catch(error => console.log(error));
  }

  async getFeatured(isCustomerPreffered: boolean):Promise<Product[]> {
    const products = await this._repository.find({ where: { IsFeatured: true} });
    return this._prepareResult(products, isCustomerPreffered);
  }

  private _prepareResult(products: Product[], isCustomerPreffered: boolean):Product[] {
    if (!isCustomerPreffered) {
      return products;
    }

    const discount = 0.95;
    return products.map((product) => {
      product.UnitPrice *= discount;
      return product;
    })
  }
}

