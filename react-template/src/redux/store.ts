import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import infoReducer from './info/slice';
import userReducer from './user/slice';

let loggerMiddleware: any = undefined;

if (process.env.NODE_ENV !== `production`) {
  const { logger } = require(`redux-logger`);

  loggerMiddleware = logger;
}

const store = configureStore({
  reducer: {
    info: infoReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'production' || !loggerMiddleware
      ? getDefaultMiddleware()
      : getDefaultMiddleware().concat(loggerMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
