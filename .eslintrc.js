module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },

  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],

  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
    'sourceType': 'module',
  },

  'plugins': [
    'react',
    'react-native',
  ],

  'rules': {
    'arrow-parens': ['error', 'always'],
    'no-console': 0,

    // Stylistic rules (automatically fixed on commit).
    'array-bracket-spacing': ['error', 'never'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'MemberExpression': 1,
    }],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true,
    }],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
    }],
    'new-parens': 'error',
    'no-lonely-if': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': ['error', 'always'],
    'operator-assignment': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'quote-props': ['error', 'as-needed'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi-spacing': 'error',
    'semi': ['error', 'always'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'spaced-comment': ['error', 'always', { 'block': { 'balanced': true } }],

    // JSX specific rules.
    'no-extra-parens': ['error', 'all', { 'ignoreJSX': 'multi-line' }],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-tag-spacing': ['error', {
      'closingSlash': 'never',
      'beforeSelfClosing': 'never',
      'afterOpening': 'never',
    }],

    // React Native specific rules.
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'error',
  },
};
