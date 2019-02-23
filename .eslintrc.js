module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended', // strongly-recommended
    '@vue/standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeature: {
      jsx: false
    }
  }
}
