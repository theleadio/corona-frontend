require('dotenv').config();

export default {
  // mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Corona Tracker',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': "X-UA-Compatible", content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'title',
        content: 'Corona Tracker',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'One stop platform for data and news related to 2019-nCov'
      },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },

      // Open Graph / Faceboook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.coronatracker.com/' },
      { property: 'og:title', content: 'Corona Tracker' },
      { property: 'og:description', content: 'One stop platform for data and news related to 2019-nCov' },
      { property: 'og:image', content: 'https://www.coronatracker.com/og-corona.png' },

      // Twitter
      { property: 'twitter:card', content: 'https://www.coronatracker.com/og-corona.png' },
      { property: 'twitter:url', content: 'https://www.coronatracker.com/' },
      { property: 'twitter:title', content: 'Corona Tracker' },
      { property: 'twitter:description', content: 'One stop platform for data and news related to 2019-nCov' },
      { property: 'twitter:image', content: 'https://www.coronatracker.com/og-corona.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/css/flag-icon.min.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/all.min.css'},
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
    '~/plugins/api-factory.js',
    '~/plugins/vanilla-back-to-top.client.js',
    '~/plugins/vue-lazyload.client.js',
    '~/plugins/vue-moment.client.js',
    '~/plugins/vue-sticky-directive.client.js',
    '~/plugins/vuejs-paginate.client.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-analytics', {
        id: process.env.GA_ID,
        // debug: {
        //   enabled: true,
        //   sendHitTask: true
        // }
      }
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-svg-loader',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_BASE_URL + process.env.API_PATH,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          // options: {
          //   fix: true
          // },
        })
      }
    }
  },
}
