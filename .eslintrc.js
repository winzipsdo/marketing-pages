module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 0,
    'semi': ['error', 'never'],
    'prefer-destructuring': 0,
    'no-param-reassign': 0,
    'global-require': 0,
    'no-plusplus': 0,
    'no-undef': 0,
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
}
