const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
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
      '@': path.resolve(__dirname, 'src')
    }),
    // antd按需加载
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    //配置主题
    addLessLoader({
      lessOptions: {
        modifyVars: {
          '@primary-color': '#1476FF',
          '@font-size-lg': '14px',
          '@border-radius-base': '4px',
          '@border-radius-sm': '4px',
          '@zindex-badge': '10',
          '@input-padding-vertical-base': '4px',
          '@input-padding-vertical-sm': '1px',
          '@input-padding-vertical-lg': '8px',
          '@font-family': 'PingFangSC-Regular, PingFang SC',
          '@code-family': 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
          '@layout-header-background': '#FFF'
        },
        javascriptEnabled: true
      }
    })
  )
};
