'use strict';

const OFF = 0;
// const WARNING = 1;
const ERROR = 2;

module.exports = {
    plugins: [
        'react'
    ],

    parser: "babel-eslint",

    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            'jsx': true
        }
    },

    // We're stricter than the default config, mostly. We'll override a few rules
    // and then enable some React specific ones.
    rules: {
        'accessor-pairs': OFF,
        'brace-style': [ERROR, '1tbs'],
        'consistent-return': OFF,
        'dot-location': [ERROR, 'property'],
        'dot-notation': ERROR,
        'eqeqeq': [ERROR, 'allow-null'],
        'indent': [ERROR, 4],
        'jsx-quotes': [ERROR, 'prefer-double'],
        'keyword-spacing': [ERROR, {after: true, before: true}],
        'no-bitwise': OFF,
        'no-inner-declarations': [ERROR, 'functions'],
        'no-multi-spaces': ERROR,
        'no-restricted-syntax': [ERROR, 'WithStatement'],
        'no-shadow': ERROR,
        'no-unused-expressions': ERROR,
        'no-unused-vars': [ERROR, {args: 'none'}],
        'quotes': [ERROR, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
        'space-before-blocks': ERROR,
        'space-before-function-paren': [ERROR, {anonymous: 'always', named: 'never'}],

        // React & JSX
        // Our transforms set this automatically
        'react/jsx-boolean-value': [ERROR, 'always'],
        'react/jsx-no-undef': ERROR,
        // We don't care to do this
        'react/jsx-sort-prop-types': OFF,
        'react/jsx-uses-react': ERROR,
        'react/no-is-mounted': OFF,
        // This isn't useful in our test code
        'react/react-in-jsx-scope': ERROR,
        'react/self-closing-comp': ERROR,
        // We don't care to do this
        'react/jsx-wrap-multilines': [ERROR, {declaration: false, assignment: false}],
        "react/jsx-uses-vars": [ERROR]
    },

    globals: {
        expectDev: true,
    },
};
