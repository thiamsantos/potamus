var gulp = require('gulp');
var sass =  require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var csscss = require('gulp-csscss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

var sassGentleman = "./src/sass/gentleman.scss";
var sassComponents = "./src/sass/**";
var jsGentleman = "./src/js/**";

// Server task
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  watch("./*.html").on('change', browserSync.reload);
  watch("./dist/**").on('change', browserSync.reload);
});

// Sass task
gulp.task('sass-task', function() {
  gulp.src(sassGentleman)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'));
  gulp.src(sassGentleman)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(rename('gentleman.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

// Javascript task
// gulp.task('js-task', function() {
//   gulp.src(jsGentleman)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(sourcemaps.init())
//     .pipe(concat('gentleman.js'))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/js/'));
//   gulp.src(jsGentleman)
//     .pipe(sourcemaps.init())
//     .pipe(concat('gentle.js'))
//     .pipe(uglify().on('error', gutil.log))
//     .pipe(rename('gentleman.min.js'))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./dist/js/'))
//     .pipe(browserSync.stream());
// });

// Test of css
gulp.task('csscss', function() {
  gulp.src(sassGentleman)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csscss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
});

// Default task
gulp.task('default', function() {
  gulp.run('sass-task', 'browser-sync');

  watch(sassGentleman, function(){
    gulp.run('sass-task');
  });
  watch(sassComponents, function(){
    gulp.run('sass-task');
  });
  // watch(jsGentleman, function(){
  //   gulp.run('js-task');
  // });
});
