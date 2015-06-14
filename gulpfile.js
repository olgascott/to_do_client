var gulp = require('gulp');
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('html', function(){
  gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function(){
  gulp.src('assets/*.scss')
    .pipe(concat('app.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
  connect.server({
    port: 8081,
    root: 'dist'
  });
});

gulp.task('watch', function() {
  gulp.watch('index.html', ['html']);

  gulp.watch('assets/*.scss', ['css']);

  var watcher  = watchify(browserify({
    entries: ['./src/app.js'],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist'))
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'server']);