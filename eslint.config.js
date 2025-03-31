import eslintPluginAstro from 'eslint-plugin-astro';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from 'typescript-eslint';

const ignoredRecommended = tseslint.configs.recommended.map(entry => ({
  ...entry,
  ignores: [
    ...(entry.ignores || []),
    '.astro/**/*',
    '.vscode/**/*',
    'node_modules/**/*',
    '**/*.min.{js,ts}',
  ],
}));

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/**/*.{astro,js,ts,jsx,tsx}'],
    ignores: ['src/**/*.min.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 'import-sorting/order': 'warn',

      'simple-import-sort/exports': 'error',
      /*
      'simple-import-sort/imports': ['warn', {
        groups: [
          ['^astro', '@astro', '^\\w', '^@', '\\w$', 'css$'],
        ]
      }],
      */

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 'Astro', packages, aliases, styles
            ['^astro', '@astro', '^\\w', '^@', '\\w$', 'css$'],
          ],
        },
      ],
      'sort-keys': ['warn', 'asc'],
    },
  },
  ...ignoredRecommended,
  ...eslintPluginAstro.configs.recommended,
];
