const path = require('path');
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['next'],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'jsx-a11y', 'html', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    // 支持最新 JavaScript
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
