import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ConnectionOptions, createConnection } from 'typeorm';
import { join } from "path";
import { Product } from './product/product.entity';
import { UserService } from './user/user.service';

const PRODUCT_REPOSITORY = Symbol('ProductRepository');

const options: ConnectionOptions = {
  type: "sqlite",
  database: join(__dirname, '..', '..', 'data', 'di.sqlite'),
  entities: [ Product ],
  logging: true
};

@Module({
  controllers: [ProductController],
  providers: [
    UserService,
    {
      provide: PRODUCT_REPOSITORY,
      useFactory: async () => {
          const connection = await createConnection(options);
          return connection.getRepository(Product);
      }
    },
    {
      provide: ProductService,
      useFactory: (productRepository, userService) => {
        return new ProductService(productRepository, userService)
      },
      inject: [PRODUCT_REPOSITORY, UserService]
    }
  ]
})
export class DiModule {}
