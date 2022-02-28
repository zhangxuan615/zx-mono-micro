module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
    },
    env: {
        es6: true,
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    extends: 'airbnb-base',
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'array-element-newline': ['error', 'consistent'],
        indent: ['error', 4, { MemberExpression: 0, SwitchCase: 1 }],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'max-len': ['error', 140],
        'no-new': 'off',
        'linebreak-style': 'off',
        'import/extensions': 'off',
        'eol-last': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'warn',
        'import/no-cycle': 'off',
        'arrow-parens': 'off',
        eqeqeq: 'off',
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        'no-continue': 'off',
        'prefer-destructuring': 'off',
        'no-plusplus': 'off',
        'prefer-const': 'off',
        'global-require': 'off',
        'no-prototype-builtins': 'off',
        'consistent-return': 'off',
        'vue/require-component-is': 'off',
        'prefer-template': 'off',
        'one-var-declaration-per-line': 'off',
        'one-var': 'off',
        'import/named': 'off',
        'object-curly-newline': 'off',
        'default-case': 'off',
        'import/order': 'off',
        'no-trailing-spaces': 'off',
        'func-names': 'off',
        radix: 'off',
        'no-unused-expressions': 'off',
        'no-underscore-dangle': 'off',
        'no-bitwise': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-unresolved': 'off',
        'import/no-self-import': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-useless-path-segments': 'off',
        'import/newline-after-import': 'off',
        'no-path-concat': 'off',
        'no-useless-catch': 'off',
        'no-restricted-syntax': 'off',
    },
}