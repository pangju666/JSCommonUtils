export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': ['babel-jest'],
  },
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^pangju-utils$': '<rootDir>/dist/pangju-utils.esm.js',
  },
};
