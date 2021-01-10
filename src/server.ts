import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { UserResolver } from './resolvers';
import { createDBConnection } from './database';
import { createAndGetFirstUser } from './entities';

const port = process.env.PORT || 4000;

async function main() {
  const app = express();

  await createDBConnection();

  const users = await createAndGetFirstUser();

  const schema = await buildSchema({ resolvers: [UserResolver] });
  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.get('/', async (_, response) => {
    return response.json({ data: users, message: 'Server is ON' });
  });

  app.use(cors());

  app.listen({ port }, () =>
    console.log(
      `Server is run at port ${port}  graphQLPAth ${server.graphqlPath}`
    )
  );
}

main();
