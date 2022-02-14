module.exports = {
  parser: '@typescript-eslint/parser',
<<<<<<< HEAD
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
=======
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'google',
  ],
>>>>>>> 4d55da2065ed5efcdab47f0eedaf62e604143df2
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
