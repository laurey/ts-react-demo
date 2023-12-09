/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    bail: 1,
    verbose: true,
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'],
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/', '<rootDir>/__tests__/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^.+\\.module\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
        '^.+\\.module\\.(css|less|sass|scss)$'
    ],
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**', '!src/**/*.d.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest'],
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    }
};
