function baseURL(){
  return process.env.BASE_URL;
}
export default {
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/creta.ico' },
      { rel: 'apple-touch-icon', size: '180x180', href: '/creta.png' },
    ],
    script: [
      { src: "https://momentjs.com/downloads/moment.min.js"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/bootstrap-vue.js', mode: 'client' },
    '~/plugins/test.js',
    '~/plugins/customer.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
  ],
  axios: {
    baseURL: baseURL(),
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false,
    proxy: true,
  },
  proxy: {
    '/admin/api/': baseURL(),
  },
  auth: {
    strategies: {
      graphql: {
        cookie: {
          // (optional) If set, we check this cookie existence for loggedIn check
          name: 'XSRF-TOKEN',
        },
        token: {
          property: 'access_token',
          maxAge: 60*60*24*60,
          global: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        scheme: '~/schemes/graphqlScheme.js',
      },
    },
    redirect: {
      login: '/login',
      logout: '/login?logout=true',
      callback: false,
      home: '/',
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: baseURL(), // Your graphql endpiont
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ]
  },
  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },
}
