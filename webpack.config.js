const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './examples/client.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'isomorphic-cookie.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
};
