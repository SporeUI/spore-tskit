const path = require('path');

module.exports = {
  verbose: true,
  rootDir: path.resolve(__dirname, './'),
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
};
