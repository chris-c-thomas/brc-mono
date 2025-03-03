module.exports = {
    env: {
      node: true,
      commonjs: true,
      es2021: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  };