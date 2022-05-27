import React, { useReducer, createContext, Context, Dispatch } from 'react';
const ADD_COUNTER = 'ADD_COUNTER';

const addActions = () => ({ type: ADD_COUNTER }); //创建一个同步action
// 创建一个异步action的函数，返回一个action对象
const asyncAction = (dispatch: Dispatch<any>) => {
  return {
    asyncAddaction() {
      //这是一个异步的添加action,定时器模拟异步
      console.log('执行addActions之前,发送请求 : ' + Date.now()); //打印一下时间
      setTimeout(() => {
        console.log('执行addActions ,请求后: ' + Date.now());
        dispatch(addActions()); //执行同步action
      }, 1000);
    },
  };
};
export const initialReucer = {
  count: 100,
};
export function reducer(state: typeof initialReucer, action: { type: typeof ADD_COUNTER }) {
  switch (action.type) {
    case ADD_COUNTER:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
export const ProviderContext: Context<any> = createContext('provider'); //创建上下文实例
//高阶组件，给函数组件注入上下文
export const providerHoc = (reducer: Function, initialState: any) => (Com: React.FC<any>) => {
  return () => {
    const [state, dispatch] = useReducer<any>(reducer, initialState);
    const asyncActions: any = asyncAction(dispatch); //对dispatch进行注入包裹,然后返回
    return (
      <ProviderContext.Provider value={{ state, asyncActions }}>
        <Com />
      </ProviderContext.Provider>
    );
  };
};
