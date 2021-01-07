import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { getRepository } from 'typeorm';

import { User, createDBConnection } from './database';

const port = process.env.PORT || 4000;

async function main() {
  const app = express();

  await createDBConnection();

  app.get('/', async (_, response) => {
    const userRepository = getRepository(User);

    await userRepository.clear();

    const newUser = userRepository.create({
      email: 'jmamadeu2000@gmail.com',
      name: 'João Amadeu',
    });
    await userRepository.save(newUser);

    const users = await userRepository.find();

    return response.json({ data: users, message: 'Server is ON' });
  });

  app.use(cors());

  app.listen(port, () => console.log(`Server is run at port ${port}`));
}

main();
