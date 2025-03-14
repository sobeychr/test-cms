/** @type {import('stylelint').Config} */

const CAMEL_CASE_CONFIG = [
  /^[a-z][a-zA-Z]+$/,
  { message: 'Expected keyframe name "%s" to be camelCase' },
];

const UPPER_CASE_CONFIG = [
  /[A-Z\_]+/,
  { message: 'Expected variable to be uppercased' },
];

export default {
  extends: [
    'stylelint-config-alphabetical-order',
    'stylelint-config-standard-scss',
  ],
  ignoreFiles: [
    '**/*.min.{css,scss}',
    'src/public-raw/**/*',
  ],
  rules: {
    'color-named': 'never',
    'keyframes-name-pattern': CAMEL_CASE_CONFIG,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'scss/dollar-variable-pattern': UPPER_CASE_CONFIG,
    'scss/at-mixin-pattern': CAMEL_CASE_CONFIG,
  },
};
