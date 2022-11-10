import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import info from './info/slice';
import user from './user/slice';

let loggerMiddleware: any = undefined;

if (process.env.NODE_ENV !== `production`) {
  const { logger } = require(`redux-logger`);

  loggerMiddleware = logger;
}

const store = () =>
  configureStore({
    reducer: {
      info,
      user,
    },
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === 'production' || !loggerMiddleware
        ? getDefaultMiddleware()
        : getDefaultMiddleware().concat(loggerMiddleware),
  });
export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
export const wrapper = createWrapper<AppStore>(store);
