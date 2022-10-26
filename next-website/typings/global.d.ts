declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'localStorage';

declare module 'redux-persist/integration/react';

declare module 'echarts-gl';
