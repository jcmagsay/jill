const gulp = require('gulp');
const gulpImagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');

gulp.task('copy-fonts', function() {
  return gulp.src('./src/assets/media/fonts/**/*')
    .pipe(gulp.dest('./public/assets/media/fonts'));
});

gulp.task('copy-images', function() {
  return gulp.src('./src/assets/media/images/**/*')
    .pipe(gulpImagemin())
    .pipe(gulp.dest('./public/assets/media/images'));
});

gulp.task('copy-video', function() {
  return gulp.src('./src/assets/media/video/**/*')
    .pipe(gulp.dest('./public/assets/media/video'));
});

module.exports = function(env) {
  return gulp.task('copy', function() {
    return runSequence(['copy-fonts', 'copy-images', 'copy-video']);
  });
}
