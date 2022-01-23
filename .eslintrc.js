// These are the base rules, that probably every typescript override will use
const tsRulesCommon = {
  '@typescript-eslint/indent': 'off',
  '@typescript-eslint/lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true,
    },
  ],
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
  '@typescript-eslint/naming-convention': [
    'error',
    { selector: 'variable', format: ['camelCase', 'snake_case', 'UPPER_CASE'], leadingUnderscore: 'allow' },
    { selector: 'variableLike', format: ['camelCase', 'snake_case'] },
  ],
  'import/no-default-export': 'error',
  'import/prefer-default-export': 'off',
  'arrow-parens': 'off',
  'class-methods-use-this': 'off',
  'function-paren-newline': 'off',
  'implicit-arrow-linebreak': 'off',
  'key-spacing': [
    'warn',
    {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    },
  ],
  'lines-between-class-members': 'off',
  'max-len': 'off',
  'no-await-in-loop': 'off',
  'no-param-reassign': 'warn',
  'no-restricted-syntax': [
    'error',
    // This is the no-restricted-syntax from airbnb, with the parts that personally I think are OK commented out
    // I thought I'd leave these comments here to explain why this stanza exists.
    // {
    //   selector: 'ForInStatement',
    //   message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    // },
    // {
    //   selector: 'ForOfStatement',
    //   message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
    // },
    {
      selector: 'LabeledStatement',
      message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],
  'object-curly-newline': 'off',
  'operator-linebreak': 'off',
};

// These are rules intended to be used in (most?  all?) test cases.  They are only added to
// override sections that apply to tests
const tsRulesTests = {
  'no-unused-expressions': 'off',
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  '@typescript-eslint/no-use-before-define': 'off',
};

function genOverride(fileSpec, extraRules = null, tsconfig = './tsconfig.json') {
  const rules = {};
  Object.assign(rules, tsRulesCommon);
  Object.assign(rules, extraRules || {});
  return {
    files: fileSpec,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb-base',
      'airbnb-typescript/base',
      'prettier',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      project: tsconfig,
    },
    rules: rules,
  };
}

const eslint = {
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    node: true,
    es6: true,
  },
  // is there anything else problematic we want to ignore?  Or we could strictly run eslint on just ./src ./test
  ignorePatterns: ['dist/**'],
  overrides: [
    // source files
    genOverride(['src/**/*.ts', 'src/**/*.tsx']),

    // test files embedded in source
    genOverride(['src/**/*.spec.ts'], tsRulesTests),

    // test files in their own directory - typically need/want their own tsconfig.
    genOverride(['test/e2e/*.ts'], tsRulesTests, './test/tsconfig.json'),
  ],
};

module.exports = eslint;
