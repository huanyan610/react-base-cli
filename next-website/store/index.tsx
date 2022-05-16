import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';

import reducer from './reducers';
export type AppStore = ReturnType<typeof makeStore>;

// BINDING MIDDLEWARE
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = () => {
  //If it's on server side, create a store
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
