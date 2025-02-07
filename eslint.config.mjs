import jestPlugin from 'eslint-plugin-jest';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import recommendedConfig from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['*.ts', '*.tsx', '*.js'],  // 适用的文件类型
    languageOptions: {
      parser: typescriptParser,  // 使用 TypeScript 解析器
      parserOptions: {
        ecmaVersion: 'latest',  // 使用最新的 ECMAScript 版本
        sourceType: 'module',  // 使用模块化代码
      },
      globals: {
        browser: true,  // 定义浏览器环境的全局变量
        es2021: true,  // 定义 ECMAScript 2021 环境的全局变量
        jest: true,  // 允许使用 Jest 的全局变量
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,  // TypeScript 插件
      prettier: prettierPlugin,  // Prettier 插件
      jest: jestPlugin,  // Jest 插件
    },
    rules: {
      'prettier/prettier': 'error',  // 强制 Prettier 格式化错误
      '@typescript-eslint/explicit-module-boundary-types': 'off',  // 关闭显式的模块边界类型要求
      'jest/no-disabled-tests': 'warn',  // 警告禁用的 Jest 测试
      'jest/consistent-test-it': ['error', { fn: 'test' }],  // 强制一致的 `test` 使用
      'jest/no-identical-title': 'error',  // 禁止相同标题的测试用例
      'no-unused-vars': 'warn',  // 允许警告未使用的变量
      'eqeqeq': 'error',  // 强制使用 === 和 !==
    },
  },
  recommendedConfig,
];
