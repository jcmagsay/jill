const gulp = require('gulp');
const clean = require('gulp-clean');

module.exports = function(env) {
  return gulp.task('clean', function () {
    return gulp.src('./public/assets', {
        'read': false
      })
      .pipe(clean());
  });
}
