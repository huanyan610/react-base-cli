const {
  override,
  adjustStyleLoaders,
  addWebpackAlias,
  addPostcssPlugins,
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
    adjustStyleLoaders(({ use: [, , postcss] }) => {
      const postcssOptions = postcss.options;
      postcss.options = { postcssOptions };
    }),
    addPostcssPlugins([
      require('postcss-preset-env')({
        browsers: 'Safari >= 13, not dead, not op_mini all',
        autoprefixer: { grid: true }, // 如果需要支持CSS Grid，则需启用此项
      }),
    ])
  ),
};
