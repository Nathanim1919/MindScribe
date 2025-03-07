import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect', // Ensures React version is detected automatically
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Disable the rule that requires React in scope
      'react/prop-types': 'off', // Disable prop-types validation
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/prop-types': 'off', // Ensure prop-types is disabled in the recommended config
    },
  },
  pluginReact.configs.flat['jsx-runtime'], // Ensures compatibility with React 17+
];