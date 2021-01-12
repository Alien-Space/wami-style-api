import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class AddCategoryInput {
  @Field({ nullable: false })
  name: string;
}

@ObjectType()
export class Category {
  @Field()
  name: string;
}

@Entity('products')
@ObjectType()
export default class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column('varchar', { unique: true })
  name!: string;

  @Field()
  @Column('varchar')
  description!: string;

  @Field()
  @Column('int')
  price!: number;

  @Column('varchar')
  category!: string;

  @Column('int')
  @Field()
  quantity: number;

  @Field(() => [Category])
  categories!: Category[];
}
