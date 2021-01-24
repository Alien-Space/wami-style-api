import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class AddCategoryInput {
  @Field(() => String, { nullable: false })
  name: string;
}

@ObjectType()
export class Category {
  @Field(() => String)
  name: string;
}

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

  @Column('varchar')
  category!: string;

  @Column('int')
  @Field(() => Number)
  quantity: number;

  @Field(() => [Category], {})
  categories!: Category[];

  @Field(() => String)
  @Column('varchar')
  mainDetail: string;

  @Field(() => String)
  @Column('varchar')
  specifications: string;
}
