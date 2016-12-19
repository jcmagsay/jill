const gulp = require('gulp');
const revall = require('gulp-rev-all');
const dotenv = require('dotenv');

// Read .env to properly set `process.env`
dotenv.config({
  'path': './.env'
});

module.exports = function() {
  return gulp.task('deploy', function () {
    gulp.src('public/**')
      .pipe(awspublish.gzip())
      .pipe(publisher.publish(headers))
      .pipe(publisher.cache())
      .pipe(awspublish.reporter())
      .pipe(cloudfront(aws));
  });
}
