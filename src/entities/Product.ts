import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import Category from './Category';
import { Image } from '.';

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

  @OneToMany(() => Image, (images) => images.product, { cascade: true })
  @Field(() => [Image], {})
  images!: Image[];

  @Field(() => String)
  @Column('varchar')
  mainDetail: string;

  @Field(() => String)
  @Column('varchar')
  specifications: string;
}
