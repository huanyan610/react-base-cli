import React, { useContext } from 'react';

import { initialReucer, ProviderContext, providerHoc, reducer } from './store';

function Test(): JSX.Element {
  const { state, asyncActions } = useContext(ProviderContext); //通过ProviderContext这个上下文实例获取到value，解构出
  const { asyncAddaction } = asyncActions; //取出asyncAddaction
  console.log(state);
  return (
    <>
      <h2>{state.count}</h2>
      <button onClick={() => asyncAddaction()}>++</button>
    </>
  );
}

export default providerHoc(reducer, initialReucer)(Test); //注入reducer,initialReucer到Test组件中，通过高阶组件对Test组件进行包裹注入
