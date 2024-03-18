export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '..spec.ts$',
  transform: {
    '^.+.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/../src/$1',
    'test/(.*)': '<rootDir>/../test/$1',
  },
};
