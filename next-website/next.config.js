const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withAntdLess = require('./next-less.config');
const withTM = require('next-transpile-modules')([
  'antd',
  'echarts',
  'zrender',
  'echarts-gl',
  'echarts-for-react',
  'scrollreveal',
]);
const withImages = require('next-images');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
// const isAnalyzer = process.env.NEXT_PUBLIC_ENV === 'analyzer';

let cdnPublicPath = '//static2.xingzheai.cn/dingting-website/';
// let ossProject = '//static2.xingzheai.cn/qianzai-website';
// if (REACT_APP_ENV === 'qa') {
//   cdnPublicPath = `${ossProject}/`;
// } else if (REACT_APP_ENV === 'prod') {
//   cdnPublicPath = `${ossProject}/prod/`;
// } else if (REACT_APP_ENV === 'dev') {
//   cdnPublicPath = `${ossProject}/dev/`;
// } else if (REACT_APP_ENV === 'pre') {
//   cdnPublicPath = `${ossProject}/pre/`;
// } else if (REACT_APP_ENV === 'demo') {
//   cdnPublicPath = `${ossProject}/demo/`;
// }

const resolveApp = (_path) => path.resolve(__dirname, _path);

// const path_config = () => (config) => {
//   // 非打包环境下
//   config.devtool = false;
//   // 修改path目录
//   paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
//   config.output.path = path.join(path.dirname(config.output.path), 'dist');
//   config.output.publicPath = cdnPublicPath;

//   return config;
// };

module.exports = withPlugins([[withCss], [withImages], [withAntdLess], [withTM]], {
  reactStrictMode: true,
  distDir: 'dist',
  generateEtags: true,
  // 本地开发时对页面内容的缓存
  onDemandEntries: {
    // 内容在内存中缓存的时长(ms)
    maxInactiveAge: 25 * 1000,
    // 同时缓存的页面数
    pagesBufferLength: 2,
  },
  // 在pages目录下会被当做页面解析的后缀
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  // 配置buildId
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }

    // 返回null默认的 unique id
    return null;
  },
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': resolveApp('./components'),
      '@lib': resolveApp('./lib'),
      '@api': resolveApp('./api'),
      '@interfaces': resolveApp('./interfaces'),
      '@layouts': resolveApp('./layouts'),
      '@store': resolveApp('./store'),
      '@styles': resolveApp('./styles'),
      '@utils': resolveApp('./utils'),
      '@static': resolveApp('./static'),
      '@pages': resolveApp('./pages'),
      '@pageComponents': resolveApp('./pageComponents'),
      '@middleware': resolveApp('./middleware'),
      '@assets': resolveApp('./assets'),
      '@data': resolveApp('./data'),
      '@locales': resolveApp('./locales'),
    };
    if (options.isServer) {
      // deal antd style
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    if (isProd) {
      //生产环境
      // config.plugins.push(...[]);
      // isAnalyzer &&
      //   config.plugins.push(
      //     ...[
      //       new BundleAnalyzerPlugin({
      //         analyzerMode: 'server',
      //         // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
      //         // Will be available at `.next/stats.json`
      //         analyzerHost: '127.0.0.1',
      //         analyzerPort: 8889,
      //         reportFilename: 'report.html',
      //         defaultSizes: 'parsed',
      //         openAnalyzer: true,
      //         generateStatsFile: false,
      //         statsFilename: 'stats.json',
      //         statsOptions: null,
      //         logLevel: 'info'
      //       })
      //     ]
      //   );
    }

    // config = path_config(config);
    return config;
  },
  // 手动修改webpackDevMiddleware配置
  webpackDevMiddleware(config) {
    return config;
  },
  // 可以在页面上通过process.env.customkey 获取 value
  // 环境变量配置
  env: {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_API_URL_1: process.env.REACT_APP_API_URL_1,
  },
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },
});
