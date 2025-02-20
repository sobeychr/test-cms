/** @type {import('stylelint').Config} */

export default {
  extends: [
    'stylelint-config-alphabetical-order',
    'stylelint-config-standard-scss',
  ],
  ignoreFiles: [
    '**/*.min.{css,scss}',
    'src/public-raw/**/*',
  ],
};
