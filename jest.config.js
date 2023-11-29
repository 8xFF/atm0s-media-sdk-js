// @ts-check
/* eslint-env node */

/**
 * An object with Jest options.
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const options = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true,
      },
    ],
  },
  resolver: 'ts-jest-resolver',
  setupFiles: ['./jest.setup.ts'],
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
};

module.exports = options;
