module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended'
    ],
    plugins: [
        'import',
        '@typescript-eslint',
        'jest',
        'react',
        'react-hooks',
        'prettier',
        'testing-library',
        'jest-dom'
    ],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    rules: {
        'prettier/prettier': 2,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/arrow-body-style': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/explicit-member-accessibility': 0,
        'import/prefer-default-export': 'off',
        'react/destructuring-assignment': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 0,
        'react/display-name': 0,
        'react/forbid-prop-types': 0,
        'react/require-default-props': 'off',
        'react/no-unused-prop-types': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.ts', '.tsx'] }],
        'jsx-a11y/no-static-element-interactions': [
            'off',
            {
                handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp']
            }
        ],
        'jest/no-focused-tests': 1
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js']
            }
        },
        react: {
            pragma: 'React',
            version: 'detect'
        }
    }
};
