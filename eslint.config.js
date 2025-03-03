import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a compatibility layer for ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

export default [
  // Apply common rules to all files
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**'],
  },
  // Base ES6+ configuration
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Core ESLint rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-multiple-empty-lines': ['warn', { max: 2, maxEOF: 1 }],
      'arrow-body-style': ['warn', 'as-needed'],
      'arrow-parens': ['warn', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      curly: ['warn', 'multi-line'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      semi: ['warn', 'always'],
    },
  },
  // Use compatible way to incorporate any existing .eslintrc configuration
  ...compat.config({
    extends: ['eslint:recommended'],
  }),
  // Additional TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': {},
    },
    rules: {
      // TypeScript-specific rules can be added here
      'no-unused-vars': 'off', // TypeScript has its own unused vars rule
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
