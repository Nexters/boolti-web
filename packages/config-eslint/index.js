module.exports = {
  root: true,
  env: { browser: true, es2020: true, es6: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'import', 'unused-imports', 'react-refresh'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': ['error', { count: 1, considerComments: true }],
    'import/no-duplicates': 'error',
    'import/no-cycle': ['error', { allowUnsafeDynamicCyclicDependency: true }],
    'import/no-unresolved': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'unused-imports/no-unused-imports-ts': ['error'],
  },
};
