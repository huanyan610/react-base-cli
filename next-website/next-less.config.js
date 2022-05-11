const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  modifyVars: { '@primary-color': 'red' }, // optional
  // lessVarsFilePath: './src/styles/variables.less', // optional
  lessVarsFilePathAppendToEndOfContent: false, // optional
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    // ...
    mode: 'local',
    localIdentName: '[local]___[hash:base64:5]', // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: 'camelCase',
    exportOnlyLocals: false,
    // ...
    getLocalIdent: (context, localIdentName, localName, options) => {
      return 'whatever_random_class_name';
    },
  },

  // Other Config Here...

  webpack(config) {
    return config;
  },
});
