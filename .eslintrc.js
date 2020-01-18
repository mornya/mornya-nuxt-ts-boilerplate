module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
    'standard',
    'vue',
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'prefer-const': 'error',
    'semi': 'off',
    'yoda': 'off',
    'no-return-assign': 'off',
    'no-multi-spaces': 'off',
    'spaced-comment': 'off',
    'padded-blocks': 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/order-in-components': 'error',
    'vue/singleline-html-element-content': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
  },
}
