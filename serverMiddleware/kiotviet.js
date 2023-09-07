// serverMiddleware/kiotviet.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (req, res, next) {
  createProxyMiddleware({
    target: 'https://id.kiotviet.vn',
    changeOrigin: true,
    pathRewrite: {
      '^/api/kiotviet': '', // Loại bỏ tiền tố /api/kiotviet
    },
  })(req, res, next);
};
