import {
  configureStore,
} from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
} from 'redux-persist';

import eventReducer
  from '../features/event/eventSlice';

const createLocalStorageEngine = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return {
    getItem: (key: string) =>
      Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key: string, value: string) =>
      Promise.resolve(window.localStorage.setItem(key, value)),
    removeItem: (key: string) =>
      Promise.resolve(window.localStorage.removeItem(key)),
  };
};

const persistConfig = {
  key: 'root',
  storage: createLocalStorageEngine(),
  timeout: 0,
};

const persistedReducer =
  persistReducer(
    persistConfig,
    eventReducer
  );

export const store =
  configureStore({
    reducer: {
      event: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
          ],
          ignoredPaths: [
            'err',
          ],
        },
      }),
  });

export const persistor =
  persistStore(store);

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;