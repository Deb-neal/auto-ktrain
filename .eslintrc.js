module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Add custom rules here
  },
  // Temporarily disabled TypeScript ESLint integration due to missing parser
  // overrides: [
  //   {
  //     files: ['**/*.ts', '**/*.tsx'],
  //     parser: '@typescript-eslint/parser',
  //     extends: [
  //       'eslint:recommended',
  //     ],
  //     rules: {
  //       // TypeScript specific rules
  //     },
  //   },
  // ],
};