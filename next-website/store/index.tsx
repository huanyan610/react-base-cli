import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper, Context } from 'next-redux-wrapper';
import reducer from './reducers';
export type AppStore = ReturnType<typeof makeStore>;

export const makeStore = (context: Context) => {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

  return store;
};

export const wrapper = createWrapper<AppStore>(makeStore);
