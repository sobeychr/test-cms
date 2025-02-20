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
    files: ['src/**/*.{js,ts}'],
    ignores: ['src/**/*.min.{js,ts}'],
  },
  ...ignoredRecommended,
];
