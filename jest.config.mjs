export default {
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm',
    transform: {
        '^.+\\.m?[tj]s?$': ['ts-jest', {
            useESM: true,
            diagnostics: false
        }],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.(m)?js$': '$1',
    },
    testMatch: [
        "<rootDir>/__tests__/test**.(ts|tsx)",
    ],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        'src/**/*.mts',
        '!src/**/*.d.ts',
        '!src/**/*.d.mts',
    ],
};