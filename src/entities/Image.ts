import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import Product from './Product';

@ObjectType()
@Entity('images')
@ObjectType()
export default class Image extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  url!: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
