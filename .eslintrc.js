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
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
  ],
  overrides: [{
    files: ['*.ts', '*.tsx'],
    extends: [
      'airbnb-typescript/base',
    ],
    // @see https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser/64488474
    parserOptions: {
      project: 'tsconfig.eslint.json',
    },
  }],
  plugins: [
    'jest',
    'no-for-of-loops',
    '@typescript-eslint',
  ],
};
