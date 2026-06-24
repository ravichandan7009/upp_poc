import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { expressMiddleware }
  from '@apollo/server/express4';

import { server } from './server';

import { seedEvents }
  from './seed/seedEvents';

async function start() {

  seedEvents();

  await server.start();

  const app = express();

  app.use(cors());

  app.use(bodyParser.json());

  app.use(
    '/graphql',
    expressMiddleware(server)
  );

  app.listen(
    4000,
    () => {
      console.log(
        'GraphQL running on port 4000'
      );
    }
  );
}

start();