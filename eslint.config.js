import js from '@eslint/js'
import ts from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
// 注意 eslint-config-prettier 在 flat config 中的使用方式可能有所不同
// 通常建议使用 plugin:prettier/recommended 的方式集成
import prettier from 'eslint-config-prettier'

export default defineConfig([
  { ignores: ['dist', 'node_modules', 'public'] },
  js.configs.recommended,
  ...ts.configs.recommended, // 使用 configs 来继承推荐配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // ecmaVersion 应在此处设置
      globals: {
        ...globals.browser, // 正确合并浏览器全局变量
        // 可以在此添加其他自定义全局变量
      },
      parser: ts.parser, // 明确指定 TypeScript 解析器
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 只需要 jsx: true, tsx 不是 ecmaFeatures 的有效选项
        },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // 建议使用 configs 来继承推荐规则，而不是直接展开 rules
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off', // 关闭基础规则，使用 TypeScript 版本
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^[A-Z_]',
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // 或 'off'
    },
  },
  // Prettier 集成 - 确保这是最后一个配置以覆盖前面的格式化规则
  prettier,
])
