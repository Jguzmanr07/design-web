module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-with-typescript',
    'prettier',
  ],
  ignorePatterns: ['vite.config.ts', 'src/vite-env.d.ts'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'typescript-sort-keys',
    'sort-keys-fix',
    'sort-destructure-keys',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'parent',
            pattern: '@/**',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '../',
          './App',
          './routes',
          './providers',
          './hooks',
          './types',
          './commons',
          './utils',
        ],
      },
    ],
    'react/jsx-sort-props': 'warn',
    'react/jsx-uses-react': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/react-in-jsx-scope': 'off',
    'sort-destructure-keys/sort-destructure-keys': [
      'warn',
      { caseSensitive: false },
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
