import { createConnection, ConnectionOptions } from 'typeorm';

import path from 'path';

export const connectionSetup: ConnectionOptions = {
  type: 'sqlite',
  database: path.resolve(__dirname, './db.sqlite'),
  synchronize: true,
  entities: [path.resolve(__dirname, '../entities/*')],
};

async function createDBConnection() {
  try {
    const connection = await createConnection(connectionSetup);

    console.log('DATABASE', connection.name);

    return connection;
  } catch (err) {
    console.log('DATABASE', err.message);
  }
}

export default createDBConnection;
