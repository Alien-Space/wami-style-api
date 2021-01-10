import { Resolver, Query } from 'type-graphql';

import { User } from '../entities';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return await User.find();
  }
}
