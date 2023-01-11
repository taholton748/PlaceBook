module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: ['error', 2],
    'arrow-parens': [2, 'as-needed'],
    'arrow-body-style': [2, 'as-needed'],
    semi: ['error', 'always'],
    'no-underscore-dangle': 0,
    'object-curly-spacing': ['error', 'always'],
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
    'linebreak-style': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'object-curly-newline': ['error', {
      ObjectExpression: {
        multiline: true,
        minProperties: 6,
        consistent: true
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 6,
        consistent: true
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 6,
        consistent: true
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 6,
        consistent: true
      }
    }],
    'react/react-in-jsx-scope': 0,
  },
};
