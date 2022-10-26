const {
  override,
  fixBabelImports,
  addLessLoader,
  adjustStyleLoaders,
  addWebpackAlias,
} = require('customize-cra');
const path = require('path');

// 修改path目录
const rewiredOutputPath = () => (config, env) => {
  if (env === 'development') {
    console.log('evn is development, skip build path change...');
  } else if (env === 'production') {
    console.log('evn is production, change build path...');
    const path = require('path');
    const paths = require('react-scripts/config/paths');
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
    config.output.path = path.join(path.dirname(config.output.path), 'dist');
  }
  return config;
};

module.exports = {
  webpack: override(
    rewiredOutputPath(),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    // antd按需加载
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    //配置主题
    addLessLoader({
      // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
      lessOptions: {
        modifyVars: {
          '@primary-color': '#266DFF',
          '@font-size-lg': '14px',
          '@border-radius-base': '4px',
          '@border-radius-sm': '2px',
          '@font-family': 'PingFangSC-Regular, PingFang SC',
          '@code-family': 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
        },
        lessOptions: {
          strictMath: true,
        },
        javascriptEnabled: true,
      },
    }),
    adjustStyleLoaders(({ use: [, , postcss] }) => {
      const postcssOptions = postcss.options;
      postcss.options = { postcssOptions };
    })
  ),
};
