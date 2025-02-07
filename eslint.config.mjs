export default [
  {
    files: ['*.js', '*.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
    },
    env: {
      browser: true,
      es2024: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
    ],
    plugins: [
      '@typescript-eslint',
      'prettier',
    ],
    rules: {
    },
  },
];
