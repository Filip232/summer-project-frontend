module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    testEnvironment: 'node',
    "moduleFileExtensions": [
        "js",
        "ts",
        "json",
        "vue"
    ],
    "transform": {
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    "testURL": "http://localhost/",
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    "jest": {
        "transformIgnorePatterns": [
            "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
        ]
    },
    "env": {
        "test": {
            "plugins": ["transform-es2015-modules-commonjs"]
        }
    }
};