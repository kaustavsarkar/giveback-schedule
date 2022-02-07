module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'google',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'quote-props': [1, 'as-needed'],
    indent: ['error', 2, {MemberExpression: 'off'}],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
