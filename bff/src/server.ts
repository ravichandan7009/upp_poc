import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import path from 'path';
import { resolvers } from './graphql/resolvers';

const typeDefs = readFileSync(
  path.join(
    process.cwd(),
    'src/graphql/schema.graphql'
  ),
  'utf-8'
);

export const server =
  new ApolloServer({
    typeDefs,
    resolvers,
  });