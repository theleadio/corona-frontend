require('dotenv').config();

const { defaultLocale, locales, COUNTRIES } = require('./utils/constants.js');
const { generateRoutes } = require('./utils/generateRoutes.js');
const routes = generateRoutes(locales, COUNTRIES);
const baseUrl = process.env.BASE_URL || 'https://www.coronatracker.com';

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
        hid: 'title',
        name: 'title',
        content: 'Corona Tracker',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'One stop platform for data and news related to COVID-19'
      },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },

      // Open Graph / Faceboook
      { property: 'og:site_name', content: 'Corona Tracker' },
      { property: 'og:type', content: 'website' },
      { hid: 'og-url', property: 'og:url', content: baseUrl },
      { hid: 'og-title', property: 'og:title', content: 'Corona Tracker' },
      { hid: 'og-description', property: 'og:description', content: 'One stop platform for data and news related to COVID-19' },
      { hid: 'og-image', property: 'og:image', content: `${baseUrl}/og-corona.png` },

      // Twitter
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter-url', property: 'twitter:url', content: baseUrl },
      { hid: 'twitter-title', property: 'twitter:title', content: 'Corona Tracker' },
      { hid: 'twitter-description', property: 'twitter:description', content: 'One stop platform for data and news related to COVID-19' },
      { hid: 'twitter-image', property: 'twitter:image', content: `${baseUrl}/og-corona.png` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/css/flag-icon.min.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/all.min.css'},
      { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.css' },
    ],
    script: [
      // Include external script link if needed.
      // {
      //   src: 'https://example.com' // external link to script
      // }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/coronatracker.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/api-factory.js',
    '~/plugins/filters/index.js',
    '~/plugins/vue-lazyload.client.js',
    //'~/plugins/vue-moment.client.js',
    '~/plugins/vue-sticky-directive.client.js',
    '~/plugins/vuejs-paginate.client.js',
    '~/plugins/vue-apexcharts.client.js',
    '~/plugins/vue-social-sharing.client.js'
  ],
  generate: {
    routes,
  },

  /*
   ** Generate Sitemap
   ** using same util function as
   ** used to generate dynamic routes
   */
  sitemap: {
    hostname: baseUrl,
    routes: routes,
    path: "/sitemap.xml",
    gzip: true
  },

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
    '@nuxtjs/sitemap'
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
    'nuxt-leaflet',
    'nuxt-i18n',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  },
  /* i18n module configuration */
  i18n: {
    locales,
    defaultLocale,
    lazy: true,
    langDir: 'lang/'
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
    },
    transpile: ['vue-clamp', 'resize-detector']
  },
}
