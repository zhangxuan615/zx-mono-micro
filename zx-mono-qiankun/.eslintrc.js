module.exports = {
    root: true, // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true // 启用 JSX
            // modules: true // 目前好像已经不支持了
        },
        sourceType: 'module', // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
        ecmaVersion: 6 // es解析器版本
    },
    env: {
        // 环境与全局变量
        browser: true, // 表示增加 浏览器中所有的全局变量 浏览器全局变量
        node: true, // 表示增加 node 中所有的全局变量 Node.js 全局变量和作用域；
        commonjs: true, // CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
        /**
         * es6 中除了模块之外的其他特性，同时将自动设置 parserOptions.ecmaVersion 参数为 6；以此类推 ES2017 是 7，而 ES2021 是 12；
         */
        es2021: true // 表示增加了 es2020 的语法特性
        // jquery: true, // 表示增加 jquery 中所有的全局变量
    },
    settings: {
        //ESLint支持在配置文件添加共享设置
        //你可以添加settings对象到配置文件，它将提供给每一个将被执行的规则
        //如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置
        'import/ignore': ['node_modules'],
        react: {
            version: 'latest'
        }
    },
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        // 'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    rules: {
        // 'prettier/prettier': 'error', // 一般不建议开启
        quotes: [2, 'single'],
        'no-console': 0,
        'no-debugger': 1,
        'no-var': 1,
        semi: ['error', 'always'],
        'no-irregular-whitespace': 0,
        'no-trailing-spaces': 1,
        'eol-last': 0,
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'after-used'
            }
        ],
        'no-case-declarations': 0,
        'no-underscore-dangle': 0,
        'no-alert': 2,
        'no-lone-blocks': 0,
        'no-class-assign': 2,
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-delete-var': 2,
        'no-dupe-keys': 2,
        'use-isnan': 2,
        'no-duplicate-case': 2,
        'no-dupe-args': 2,
        'no-empty': 2,
        'no-func-assign': 2,
        'no-invalid-this': 0,
        'no-redeclare': 2,
        'no-spaced-func': 2,
        'no-this-before-super': 0,
        'no-undef': 2,
        'no-return-assign': 0,
        'no-script-url': 2,
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 2,
        'no-extra-boolean-cast': 0,
        'no-unreachable': 1,
        'comma-dangle': 2,
        'no-mixed-spaces-and-tabs': 2,
        'prefer-arrow-callback': 0,
        'arrow-parens': 0,
        'arrow-spacing': 0,
        camelcase: 0,
        'jsx-quotes': [1, 'prefer-double'],
        'react/display-name': 0,
        'react/forbid-prop-types': [
            2,
            {
                forbid: ['any']
            }
        ],
        'react/jsx-boolean-value': 0,
        'react/jsx-closing-bracket-location': 1,
        'react/jsx-curly-spacing': [
            2,
            {
                when: 'never',
                children: true
            }
        ],
        // "indent": ["error", 4, {
        //     "SwitchCase": 1
        // }],
        'react/jsx-indent': ['error', 2],
        'react/jsx-key': 2,
        'react/jsx-no-bind': 0,
        'react/jsx-no-duplicate-props': 2,
        'react/jsx-no-literals': 0,
        'react/jsx-no-undef': 1,
        'react/jsx-pascal-case': 0,
        'react/jsx-sort-props': 0,
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 2,
        'react/no-danger': 0,
        'react/no-did-mount-set-state': 0,
        'react/no-did-update-set-state': 0,
        'react/no-direct-mutation-state': 2,
        'react/no-multi-comp': 0,
        'react/no-set-state': 0,
        'react/no-unknown-property': 2,
        'react/prefer-es6-class': 2,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 2,
        'react/self-closing-comp': 0,
        'react/sort-comp': 0,
        'react/no-array-index-key': 0,
        'react/no-deprecated': 1,
        'react/jsx-equals-spacing': 2
    }
};
