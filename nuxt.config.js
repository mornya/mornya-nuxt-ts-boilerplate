const srcDirName = '/src'

module.exports = {
  mode: 'spa',
  typeCheck: true,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/src/plugins/vue-composition-api',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Loaders
  */
  loaders: {
    ts: {
      silent: true
    },
    tsx: {
      silent: true
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.resolve.alias['@'] = `${config.resolve.alias['@']}/${srcDirName}`
      config.resolve.alias['~'] = `${config.resolve.alias['~']}/${srcDirName}`
      config.resolve.alias['@@'] = `${config.resolve.alias['@@']}/${srcDirName}`
      config.resolve.alias['~~'] = `${config.resolve.alias['~~']}/${srcDirName}`
      config.resolve.alias.assets = config.resolve.alias.assets.replace(/\/assets/, `/${srcDirName}/assets`)
    }
  }
}
