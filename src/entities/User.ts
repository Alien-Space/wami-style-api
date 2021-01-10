import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, ObjectType } from 'type-graphql';

@Entity('users')
@ObjectType()
export default class UserEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column('varchar')
  name!: string;

  @Field()
  @Column('varchar')
  email!: string;
}

export async function createAndGetFirstUser() {
  await UserEntity.clear();

  const newUser = UserEntity.create({
    email: 'jmamadeu2000@gmail.com',
    name: 'João Amadeu',
  });
  await UserEntity.save(newUser);

  const users = await UserEntity.find();

  return users;
}
