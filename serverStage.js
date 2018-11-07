// server.js
const next = require('next');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);
const proxy = require('http-proxy-middleware');
const axios = require('axios');

// With express
const express = require('express');
const port = isDev ? 3000 : 8080;
app.prepare().then(() => {
  express()
     .use('/api',  proxy({target: process.env.API_HOST,  changeOrigin: true}))
    .use(handler)
    .use(cookieParser())
    .listen(port);
});