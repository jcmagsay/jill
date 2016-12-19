const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const runSequence = require('run-sequence');

// Individual Gulp Tasks
const taskWebpack = require('./tasks/task-webpack')(process.env.NODE_ENV);
const taskSass = require('./tasks/task-sass')(process.env.NODE_ENV);
const taskCopy = require('./tasks/task-copy')(process.env.NODE_ENV);
const taskClean = require('./tasks/task-clean')(process.env.NODE_ENV);

const buildSequence = ['sass', 'copy', 'webpack'];
const watchSequence = ['sass', 'copy'];

gulp.task('watch', ['clean'], function(done) {
  return runSequence(
    watchSequence,
    function(){
      gulpWatch([
          './src/assets/styles/**/*.scss'
        ],
        function() { gulp.start('sass'); }
      );
      gulpWatch([
          './src/assets/media/**/*'
        ],
        function() { gulp.start('copy'); }
      );
    }
  );
});

gulp.task('build', ['clean'], function(done) {
  return runSequence(buildSequence);
});
