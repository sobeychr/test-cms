import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
	  globals: {
	    ...globals.browser,
	    ...globals.node
	  }
    }
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
  	  parserOptions: {
  	    parser: ts.parser,
  	  },
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/']
  },
  {
    files: ['*.{js,ts}', '**/*.{js,ts}'],

    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },

    rules: {
      indent: ['warn', 2],
      'max-len': ['warn', {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      }],

      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
);
