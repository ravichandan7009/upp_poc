import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client/core';

import {
  HttpLink,
} from '@apollo/client/link/http';

export const apolloClient =
  new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql',
    }),

    cache: new InMemoryCache(),
  });