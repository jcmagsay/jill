const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const config = require('../config/webpack.config');

module.exports = function(env) {
  const isProd = env === 'production';

  if (isProd) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      'compress': {
        'warnings': false
      }
    }));
  } else {
    config.entry.push('webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr');
    config.entry.push('webpack/hot/dev-server');
  }

  return gulp.task('webpack', function() {
    return gulp.src([
        './src/client/index.js'
      ])
      .pipe(webpackStream(config))
      .pipe(gulp.dest('./public/assets/scripts'));
  });
}
