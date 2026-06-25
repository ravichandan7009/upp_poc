import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  ApolloProvider,
} from '@apollo/client/react';

import {
  Provider,
} from 'react-redux';

import {
  PersistGate,
} from 'redux-persist/integration/react';

import {
  BrowserRouter,
} from 'react-router-dom';

import App from './App';

import {
  apolloClient,
} from './app/apolloClient';

import {
  store,
  persistor,
} from './app/store';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>

    <ApolloProvider
      client={apolloClient}
    >

      <Provider store={store}>

        <PersistGate
          loading={null}
          persistor={persistor}
        >

          <BrowserRouter>

            <App />

          </BrowserRouter>

        </PersistGate>

      </Provider>

    </ApolloProvider>

  </React.StrictMode>
);