const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withAntdLess = require('./next-less.config');
const withTM = require('next-transpile-modules')([
  'antd',
  'echarts',
  'zrender',
  'echarts-gl',
  'echarts-for-react',
  'scrollreveal',
]);

const isProd = process.env.NEXT_PUBLIC_ENV === 'production';

module.exports = withPlugins([[withCss], [withImages], [withAntdLess], [withTM]], {
  reactStrictMode: true,
  distDir: 'dist',
  generateEtags: true,
  // 本地开发时对页面内容的缓存
  // onDemandEntries: {
  //   // 内容在内存中缓存的时长(ms)
  //   maxInactiveAge: 25 * 1000,
  //   // 同时缓存的页面数
  //   pagesBufferLength: 2,
  // },
  // 在pages目录下会被当做页面解析的后缀
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],

  // webpack(config, options) {
  //   if (options.isServer) {
  //     // deal antd style
  //     const antStyles = /antd\/.*?\/style.*?/;
  //     const origExternals = [...config.externals];
  //     config.externals = [
  //       (context, request, callback) => {
  //         if (request.match(antStyles)) return callback();
  //         if (typeof origExternals[0] === 'function') {
  //           origExternals[0](context, request, callback);
  //         } else {
  //           callback();
  //         }
  //       },
  //       ...(typeof origExternals[0] === 'function' ? [] : origExternals),
  //     ];
  //     config.module.rules.unshift({
  //       test: antStyles,
  //       use: 'null-loader',
  //     });
  //   }

  //   return config;
  // },

  // 可以在页面上通过process.env.customkey 获取 value
  // 环境变量配置
  env: {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },
});
