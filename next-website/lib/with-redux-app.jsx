import React from 'react';
import { initializeStore } from '@store'; //引入初始化的store

const isServer = typeof window === 'undefined'; //判断一下window在不在
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'; //定一个常量用来对象存储的key名

function getOrCreateStore(initialState) {
  if (isServer) {
    //当window不存在的时候 直接返回初始化的整个store 就是在服务器的时候
    return initializeStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    //这个索引的对象不存在 客户端的时候，注入一个属性
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState); //就初始化整个store给它
  }
  return window[__NEXT_REDUX_STORE__]; //最终返回这个对象的key为__NEXT_REDUX_STORE__的值，也就是初始化的整个store
}

const withRedux = (App) => {
  //App为传入的组件
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore(); //获取初始化的整个store
      appContext.ctx.reduxStore = reduxStore; //而后赋值给整个上下文

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState(), //获取初始化的state值
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState); //获取整个store
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withRedux;
