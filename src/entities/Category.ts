import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, InputType, ObjectType } from 'type-graphql';
import Product from './Product';

@InputType()
export class AddCategoryInput {
  @Field(() => String, { nullable: false })
  name: string;
}

@ObjectType()
@Entity('category')
@ObjectType()
export default class Category extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  name!: string;

  @ManyToOne(() => Product, (product) => product.categories)
  product: Product;
}
