function baseURL(){
  // Proxy cho keystone
  return "http://localhost:3001/admin/api";
  // return `https://be.creta.vn/admin/api`;
}
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ERP-CRETA',
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
      { rel: 'stylesheet',  href:"https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" },
      { rel: 'stylesheet', href:"https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css"},
    ],
    script: [
      { src:"https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.slim.min.js" },
      { src:"https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" },
      { src:"https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" },
      { src:"https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js" },
      { src: "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-vi_VN.min.js"},
      { src: "https://use.fontawesome.com/releases/v5.15.4/js/all.js"},
      { src: "https://momentjs.com/downloads/moment.min.js"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/graphql.js'
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
    host: '0.0.0.0',
    port: 3000
  },
}
