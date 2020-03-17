module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true, // Set globally because it is not applied to overrides
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'standard',
    'vue',
  ],
  // add your custom rules here
  rules: {
    // for js
    'comma-dangle': 'off',
    'prefer-const': 'error',
    'no-console': 'off', // 라이브 배포시 빌드오류를 막기 위해 off 한다.
    'no-debugger': 'off', // 라이브 배포시 빌드오류를 막기 위해 off 한다.
    'no-inner-declarations': 'off',
    'no-multi-spaces': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'padded-blocks': 'off',
    'semi': 'off',
    'spaced-comment': 'off',
    'yoda': 'off',
    // for vue
    'vue/attribute-hyphenation': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-parsing-error': ['error', {
      'control-character-in-input-stream': false,
    }],
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // for nuxt
    'nuxt/no-cjs-in-config': 'off',
  },
}
