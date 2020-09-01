const { ContextReplacementPlugin, NormalModuleReplacementPlugin } = require('./node_modules/webpack')
const ForkTsCheckerWebpackPlugin = require('./node_modules/fork-ts-checker-webpack-plugin')

const { env } = process
const isProduction = env.NODE_ENV === 'production'
const srcDirName = 'src'
const basename = isProduction ? 'skeleton' : ''

module.exports = {
  mode: 'universal',
  typeCheck: true,
  router: {
    base: `/${basename}${basename ? '/' : ''}`,
    mode: 'history',
    //middleware: [''],
  },
  env,
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
      { name: 'description', content: env.APP_DESCRIPTION },
    ],
    title: env.APP_NAME_FULL,
    link: [
      // DNS prefetch
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com/' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com/', crossOrigin: 'anonymous' },
      // Favicon
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      // CSS (preloaded)
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&family=Roboto+Slab&display=swap',
        onload: 'this.rel="stylesheet"',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        as: 'style',
        href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
        onload: 'this.rel="stylesheet"',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: './src/plugins/vue-events' },
    { src: './src/plugins/vue-lazyload' },
    { src: './src/plugins/vue-progressbar', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    //'@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    //'@nuxtjs/dotenv'
  ],
  /*
   ** Loaders
   */
  loaders: {
    ts: {
      silent: true,
    },
    tsx: {
      silent: true,
    },
    sass: {
      // sass-loader
      sourceMap: false,
      prependData: `
        @import "~@/assets/scss/_variables.scss";
      `.trim(),
    },
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: isProduction,
    filenames: isProduction ? {
      css: '[name]-[contenthash].css',
      app: '[name]-[chunkhash].js',
      vendor: '[name]-[chunkhash].js',
      chunk: '[name]-[chunkhash].chunk.js',
    } : undefined,
    // npm link로 라이브러리 테스트시 false로 설정 필요
    followSymlinks: (!isProduction && env.APP_LIBRARY_TEST_MODE === 'true') ? true : undefined,
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // production / development mode 에 따른 설정
      if (isProduction) {
        // 빌드 퍼포먼스 및 IE대응을 위해 (eval 관련 사용금지)
        config.devtool = false /*'source-map'*/
        // chunk-vendors 최대 사이즈 설정
        config.optimization.splitChunks.cacheGroups.vendors.maxSize = 2048000
      } else {
        config.devtool = 'cheap-module-source-map'
      }

      // build performance 및 lintest 설정
      const getForkTsCheckerPlugin = (options = {}) => {
        const os = require('os')
        const fs = require('fs')
        const lintestInfoFilename = './node_modules/.cache/lintest/info.json'
        const lintestInfoJson = fs.existsSync(lintestInfoFilename) ? require(lintestInfoFilename) : null
        const totalMem = Math.floor(os.totalmem() / 1048576) // get OS memory size as MB (totalMem/1024/1024)
        const memoryLimit = totalMem > 4096 ? 2048 : 1024 // 젠킨스 등 빌드서버 메모리가 작을 경우를 대비하여 변경 (default=2048MB)
        const nextOption = {
          ...options,
          async: true,
          typescript: {
            enabled: !isProduction,
            configFile: './tsconfig.json',
            memoryLimit,
          },
          eslint: {
            enabled: !isProduction && !!lintestInfoJson,
            files: './src/**/*.{ts,tsx,js,jsx,mjs}',
            options: lintestInfoJson ? lintestInfoJson.eslintOptions : {},
            memoryLimit,
          },
        }
        return new ForkTsCheckerWebpackPlugin(nextOption)
      }
      const indexForkTsCheckerPlugin = config.plugins.findIndex(plugin => plugin instanceof ForkTsCheckerWebpackPlugin)
      if (indexForkTsCheckerPlugin !== -1) {
        config.plugins[indexForkTsCheckerPlugin] =
          getForkTsCheckerPlugin(config.plugins[indexForkTsCheckerPlugin].options)
      } else {
        config.plugins.push(getForkTsCheckerPlugin())
      }

      // import 경로에 /src를 기본 경로로 포함
      //config.resolve.modules.unshift(`./${srcDirName}`)

      // Ignoring unused locales in 'moment' dependency
      config.plugins.push(new ContextReplacementPlugin(/moment[/\\]locale$/, /ko/))
      // Replace default locale for the Element-UI
      config.plugins.push(new NormalModuleReplacementPlugin(/element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/, 'element-ui/lib/locale/lang/ko'))

      config.resolve.alias['@'] = `${config.resolve.alias['@']}/${srcDirName}`
      config.resolve.alias['~'] = `${config.resolve.alias['~']}/${srcDirName}`
      config.resolve.alias['@@'] = `${config.resolve.alias['@@']}/${srcDirName}`
      config.resolve.alias['~~'] = `${config.resolve.alias['~~']}/${srcDirName}`
      config.resolve.alias.assets = config.resolve.alias.assets.replace(/\/assets/, `/${srcDirName}/assets`)

      // import시 .ts, .tsx 파일도 포함되도록
      config.resolve.extensions.push('.ts')
      config.resolve.extensions.push('.tsx')
    },
  },
}
