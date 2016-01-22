var gulp = require('gulp');
var sass =  require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

var sassGentle = "./src/sass/gentle.scss";
var sassComponents = "./src/sass/**";
var jsGentle = "./src/js/**";

// Sass task
gulp.task('sass-task', function() {
  gulp.src(sassGentle)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'));
  gulp.src(sassGentle)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('gentle.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'));
});

// Javascript task
// gulp.task('js-task', function() {
//   gulp.src(jsGentle)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(sourcemaps.init())
//     .pipe(concat('gentle.js'))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/js/'));
//   gulp.src(jsGentle)
//     .pipe(sourcemaps.init())
//     .pipe(concat('gentle.js'))
//     .pipe(uglify().on('error', gutil.log))
//     .pipe(rename('gentle.min.js'))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./dist/js/'));
// });

// Default task
gulp.task('default', function() {
  gulp.run('sass-task');

  watch(sassGentle, function(){
    gulp.run('sass-task');
  });
  watch(sassComponents, function(){
    gulp.run('sass-task');
  });
  // watch(jsGentle, function(){
  //   gulp.run('js-task');
  // });
});
