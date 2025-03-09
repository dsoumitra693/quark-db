/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.ts$': [
        'ts-jest',
        {
          useESM: true,
        },
      ],
    },
  };