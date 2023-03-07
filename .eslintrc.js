module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser'
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      rules: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',
        'vuejs-accessibility/anchor-has-content': 'off'
      },
      extends: [
        'plugin:vue/strongly-recommended',
        'plugin:nuxt/recommended',
        '@vue/typescript'
      ]
    }
  ]
};
