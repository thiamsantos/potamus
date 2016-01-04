var gulp = require('gulp');
var sass =  require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

var gentle = "./src/gentle.scss";
var components = "./src/**";

// Sass task
gulp.task('sass-task', function() {
  gulp.src(gentle)
    .pipe(sass())
    .pipe(gulp.dest('./dist/'));
  gulp.src(gentle)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('gentle.min.css'))
    .pipe(gulp.dest('./dist/'));
});

// Default task
gulp.task('default', function() {
  gulp.run('sass-task');

  watch(gentle, function(){
    gulp.run('sass-task');
  });
  watch(components, function(){
    gulp.run('sass-task');
  });
});
