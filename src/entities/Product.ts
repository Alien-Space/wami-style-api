import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import Category from './Category';

@Entity('products')
@ObjectType()
export default class Product extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  name!: string;

  @Field(() => String)
  @Column('varchar')
  description!: string;

  @Field(() => Number)
  @Column('int')
  price!: number;

  @Column('int')
  @Field(() => Number)
  quantity: number;

  @OneToMany(() => Category, (categories) => categories.product)
  @Field(() => [Category], {})
  categories!: Category[];

  @Field(() => String)
  @Column('varchar')
  mainDetail: string;

  @Field(() => String)
  @Column('varchar')
  specifications: string;
}
