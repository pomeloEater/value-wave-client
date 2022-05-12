const { createProxyMiddleware } = require('http-proxy-middleware');
const options = {
  target: 'http://localhost:8000',
  pathFilter: ['/api/**', '/hello'],
  changeOrigin: true,
};
module.exports = function (app) {
  app.use(createProxyMiddleware(options));
};
