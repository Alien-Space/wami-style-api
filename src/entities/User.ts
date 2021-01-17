import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, ObjectType } from 'type-graphql';

@Entity('users')
@ObjectType()
export default class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('varchar')
  name!: string;

  @Field(() => String)
  @Column('varchar')
  email!: string;
}

export async function createAndGetFirstUser() {
  await User.clear();

  const newUser = User.create({
    email: 'jmamadeu2000@gmail.com',
    name: 'João Amadeu',
  });
  await User.save(newUser);

  const users = await User.find();

  return users;
}
