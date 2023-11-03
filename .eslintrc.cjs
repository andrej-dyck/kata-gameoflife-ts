module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    'space-unary-ops': ['warn'],
    'consistent-return': ['warn'],
    'eol-last': ['warn'],
    'no-else-return': ['warn'],
    'no-empty-function': ['warn'],
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-trailing-spaces': ['warn'],
    'object-curly-spacing': ['warn', 'always'],
  },
  ignorePatterns: [
    '.eslintrc.cjs',
  ],
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true },
        ],
        '@typescript-eslint/prefer-readonly': ['warn'],
        '@typescript-eslint/space-before-blocks': ['error'],
        '@typescript-eslint/switch-exhaustiveness-check': ['warn'],
        '@typescript-eslint/type-annotation-spacing': [
          'error',
          {
            before: false,
            after: true,
            overrides: { arrow: { before: true, after: true } },
          },
        ],
      },
    }
  ],
}
