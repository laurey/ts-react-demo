/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    bail: 1,
    verbose: true,
    // clearMocks: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy'
    },
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['**/*.{ts,tsx,js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    // The test environment that will be used for testing
    testEnvironment: 'jsdom'
};
