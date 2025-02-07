export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': ['babel-jest'],
  },
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^/(.*)': '<rootDir>/dist/$1',
  },
};
