const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withAntdLess = require('./next-less.config');

const isProd = process.env.NEXT_PUBLIC_ENV === 'production';

module.exports = withPlugins([[withCss], [withImages], [withAntdLess], [withTM]], {
  reactStrictMode: true,
  distDir: 'dist',
  generateEtags: true,
  transpilePackages: [
    'antd',
    'echarts',
    'zrender',
    'echarts-gl',
    'echarts-for-react',
    'scrollreveal',
  ],
  // 在pages目录下会被当做页面解析的后缀
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
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
