const gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      plumber = require('gulp-plumber'),
      babel = require('gulp-babel');

gulp.task('stylus', () =>
  gulp.src('./components/**/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./site/dist/')));

gulp.task('stylus-watch', () =>
  gulp.watch('./components/**/*.styl', ['stylus']));

gulp.task('js', () =>
  gulp.src('./components/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']}))
    .pipe(gulp.dest('./site/dist/')));

gulp.task('js-watch', () =>
  gulp.watch('./components/**/*.js', ['js']));

gulp.task('watch', ['js-watch', 'stylus-watch']);
