const {pathsToModuleNameMapper} = require('ts-jest')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const {compilerOptions} = require('./tsconfig.json')


module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/__tests__/**/*.ts?(x)",
        "**/?(*.)+(spec|test).ts?(x)"
    ],
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),

    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: [
        'json',
        'text',
        'lcov',
        'clover',
    ],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.{dto,module}.ts"
    ],
    coveragePathIgnorePatterns: [
        "src/core/.*\\.ts",
        "src/server.ts",
        "src/application.ts",
    ]
};
