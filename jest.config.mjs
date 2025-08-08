export default {
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
            diagnostics: false
        }],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.(m)?js$': '$1',
    },
    // Don't transform ESM modules like svgdom
    transformIgnorePatterns: [
        'node_modules/(?!svgdom)'
    ],
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