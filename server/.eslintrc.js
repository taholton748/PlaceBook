module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'arrow-parens': [
      2,
      'as-needed'
    ],
    'arrow-body-style': [
      2,
      'as-needed'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-underscore-dangle': 0,
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'comma-dangle': [
      'error',
      {
        functions: 'never',
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'never',
        exports: 'never',
      }
    ],
    'func-names': 0,
    'linebreak-style': 0
  }
};
