// https://github.com/AlloyTeam/eslint-config-alloy

module.exports = {
  root: true,
  env: {
    jest: true,
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    'jest',
    'no-for-of-loops',
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ]
};
