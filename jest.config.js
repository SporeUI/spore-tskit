const path = require('path');

module.exports = {
  verbose: true,
  rootDir: path.resolve(__dirname, './'),
  coverageDirectory: './docs-dist/coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue', 'json'],
  transform: {
    '.*\\.js$': 'babel-jest',
    '.*\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      babelConfig: true,
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '.history',
  ],
  setupFiles: [
    './test/mocks/env.js',
    './test/mocks/client.js',
  ],
};
