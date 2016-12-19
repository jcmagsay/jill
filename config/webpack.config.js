const webpack = require('webpack');
const path = require('path');

module.exports = {
  'module': {
    'loaders': [
      {
        'test': /\.js?$/,
        'loader': 'babel-loader',
        'exclude': /node_modules/
      },
      {
        'test': /\.(png|jpg|ttf|woff|svg|otf|eot|svg).*?$/,
        'loader': 'file-loader'
      }
    ]
  },
  'resolve': {
    'extensions': ['', '.js', '.jsx']
  },
  'output': {
    'path': '/',
    'publicPath': 'http://localhost:8080/assets/scripts',
    'filename': 'bundle.js'
  },
  'entry': [
    './src/client/index.js'
  ],
  'plugins': [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  'devServer': {
    'contentBase': 'public',
    'historyApiFallback': true,
    'hot': true,
    'inline': true
  }
}
