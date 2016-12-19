const gulp = require('gulp');
const gulpSass = require('gulp-sass');

module.exports = function(env) {
  return gulp.task('sass', function() {
    return gulp.src('./src/assets/styles/*.scss')
      .pipe(gulpSass({
          'outputStyle': env === 'production' ? 'compressed' : 'expanded'
        }).on('error', gulpSass.logError)
      )
      .pipe(gulp.dest('./public/assets/styles'));
  });
}
