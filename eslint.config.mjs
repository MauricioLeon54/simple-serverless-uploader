/**
 * @prettier
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '.build/*',
      '.dist/*',
      '.serverless/*',
      '.webpack/*',
      'cache/*',
      'data/*',
      'data-all/*',
      'data-reports/*',
      'flow-typed/*',
      'mapping-templates/*',
      'node_modules/*',
      '**/webpack.config.js',
    ],
  },
  ...fixupConfigRules(compat.extends('plugin:@typescript-eslint/recommended', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript', 'prettier')),
  {
    plugins: {
      'unused-imports': unusedImports,
      'no-relative-import-paths': noRelativeImportPaths,
      'import': fixupPluginRules(_import),
      prettier,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        node: { moduleDirectory: ['node_modules', '.'] },

        typescript: { alwaysTryTypes: true },
      },

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports', // Prefiere 'import type' para tipos
          disallowTypeAnnotations: false, // Permite 'import' estándar en anotaciones de tipo
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': ['off', { allowSameFolder: false }],

      'no-var': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'prefer-promise-reject-errors': 'off',

      'quotes': ['warn', 'single', { avoidEscape: true }],

      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'no-unused-vars': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-named-as-default-member': 'off',
      'no-debugger': 'off',

      'prettier/prettier': ['error', { printWidth: 200 }],

      'space-in-parens': ['error', 'never'],
      'padded-blocks': ['error', 'never'],

      'space-infix-ops': ['error', { int32Hint: false }],

      'space-before-blocks': 'error',
      'no-new-object': 'error',

      'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],

      'prefer-object-spread': 'error',
      'no-array-constructor': 'error',

      'semi': ['error', 'always', { omitLastInOneLineBlock: true }],

      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'unused-imports/no-unused-imports': 'error',
      'space-unary-ops': 'error',
      'keyword-spacing': 'error',
      'semi-spacing': 'error',
      'no-extra-semi': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': ['error', 'always'],
      'template-curly-spacing': 'error',
      'no-useless-concat': 'error',
      'no-new-func': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-exponentiation-operator': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-case-declarations': 'error',
      'eqeqeq': 'error',

      'spaced-comment': ['error', 'always', { exceptions: ['-', '+', '/'] }],

      'no-restricted-imports': ['error', { patterns: [{ group: ['./', '../'], message: 'Relative imports are not allowed.' }] }],
    },
  },
];
