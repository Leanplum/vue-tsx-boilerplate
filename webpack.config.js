const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['reflect-metadata', path.resolve(__dirname, 'src/index.ts')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              allowTsInNodeModules: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  stats: false
};
