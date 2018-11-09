// server.js
const next = require('next');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);
const proxy = require('http-proxy-middleware');

const axios = require('axios');


// axios.post('http://18.217.30.162/api/Account/Login', {
//   Email: 'some@gmail.com',
//   Password: '123466'
// })
// .then(r => {
//   console.log(r);
// })
// .catch(err => {
//   console.log(err);
// })

// With express
const express = require('express');
const port = isDev ? 3000 : 8081;
app.prepare().then(() => {
  const server = express();
  server.get('/home/manage-groups/group/:name', (req, res) => {
    const actualPage = '/home/manage-groups/group';
    const queryParams = { name: req.params.name };
    app.render(req, res, actualPage, queryParams);
  });
  server
    .use('/api',  proxy({target: process.env.API_HOST,  changeOrigin: true}))
    .use(handler)
    .use(cookieParser())
    .listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
});