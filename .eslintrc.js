const eslint = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // 'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'object-curly-newline': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-console': 'off',
    // 'max-len': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'function-paren-newline': 'off',
    // '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/indent': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'max-classes-per-file': 'off',
    'no-await-in-loop': 0,
    'import/no-relative-packages': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
};

module.exports = eslint;
