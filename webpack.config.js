const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  devtool: NODE_ENV === 'production' ? null : 'source-map',
  entry: [
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'html/assets'),
    filename: 'bundle.js',
    publicPath: '/html/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /\.js(x)?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};

if (NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
  }));
}

module.exports = config;
