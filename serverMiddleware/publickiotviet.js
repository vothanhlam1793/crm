// serverMiddleware/publickiotviet.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (req, res, next) {
  createProxyMiddleware({
    target: 'https://public.kiotapi.com', // URL của API public.kiotviet.vn
    changeOrigin: true,
    pathRewrite: {
      '^/api/publickiotviet': '', // Loại bỏ tiền tố /api/publickiotviet
    },
  })(req, res, next);
};