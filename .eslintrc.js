module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
    '.eslintrc-auto-import.json'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  globals: {
    uni: true,
    wx: true,
    getApp: true,
    getCurrentPages: true
  },
  rules: {
    'no-new': 0,
    'vue/multi-word-component-names': 0
  }
}
