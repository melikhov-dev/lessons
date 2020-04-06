import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity( 'Product', {})
export class Product {

  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  UnitPrice: number;

  @Column()
  IsFeatured: boolean;

}
