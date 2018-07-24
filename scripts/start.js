if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

const server = express();

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/'
});

server.use(devMiddleware);

server.use(webpackHotMiddleware(compiler));

const html = `
<!DOCTYPE html>
<html>

<head>
  <title>Leanplum Vue TSX Boilerplate</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta http-equiv="Content-Language" content="en">
  <meta name="viewport" content="width=device-width">
  <style>
    html {
      background-color: #e6ebf1;
    }
  </style>
</head>

<body>
  <div id="root"></div>

  <script type="text/javascript" src="/main.js"></script>
</body>

</html>
`;

server.use((_req, res) => {
  res.status(200).send(html);
});

devMiddleware.waitUntilValid(() => {
  server.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`);
  });
});
