var gulp         = require('gulp')
var jade         = require('gulp-jade')
var csso         = require('gulp-csso')
var rimraf       = require('gulp-rimraf')
var rename       = require('gulp-rename')
var stylus       = require('gulp-stylus')
var uglify       = require('gulp-uglify')
var concat       = require('gulp-concat')
var replace      = require('gulp-replace')
var connect      = require('gulp-connect')
var sequence     = require('gulp-sequence')
var ghPages      = require('gulp-gh-pages')
var sourcemaps   = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')

var package      = require('./package.json')

/* ==== Tasks ==== */
gulp.task('clean', function () {
  return gulp.src(['_gh_pages', 'dist'], {read: false})
    .pipe(rimraf({
      force: true
    }))
})

gulp.task('styles', function () {
  return gulp.src('src/styles/ui.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      'paths': ['./node_modules']
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(replace("${version}", package.version))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles/'))
})

gulp.task('styles-min', function () {
  return gulp.src('dist/styles/ui.css')
    .pipe(csso())
    .pipe(rename('ui.min.css'))
    .pipe(gulp.dest('dist/styles/'))
})

gulp.task('scripts', function () {
  return gulp.src('node_modules/bootstrap-styl/js/**/*')
    .pipe(concat('ui.js'))
    .pipe(gulp.dest('dist/scripts/'))
})

gulp.task('fonts', function () {
  return gulp.src('node_modules/tb-icons/dist/fonts/**')
    .pipe(gulp.dest('dist/fonts/'))
})

gulp.task('scripts-min', function () {
  return gulp.src('dist/scripts/ui.js')
    .pipe(uglify())
    .pipe(rename('ui.min.js'))
    .pipe(gulp.dest('dist/scripts/'))
})

gulp.task('docs-jade', function () {
  gulp.src('src/docs/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('_gh_pages/'))
    .pipe(connect.reload())
})

gulp.task('docs-styles', function () {
  gulp.src('src/docs/*.styl')
    .pipe(stylus({
      'include css': true,
      'paths': ['./node_modules']
    }))
    .pipe(gulp.dest('_gh_pages/'))
    .pipe(connect.reload())
})

gulp.task('docs-scripts', function () {
  gulp.src('src/docs/*.js')
    .pipe(gulp.dest('_gh_pages/'))
    .pipe(connect.reload())
})

gulp.task('docs-icons', function () {
  gulp.src('dist/*.css')
    .pipe(gulp.dest('_gh_pages/icons'))
})

gulp.task('docs-fonts', function () {
  gulp.src('dist/*.css')
    .pipe(gulp.dest('_gh_pages/icons'))
})

/* ==== Watch & Serve ==== */
gulp.task('watch', function () {
  gulp.watch('src/styles/**/*', ['styles', 'docs'])
  gulp.watch('src/docs/**/*', ['docs'])
})

gulp.task('serve', ['watch'], function () {
  connect.server({
    root: '_gh_pages',
    port: 8001,
    livereload: true
  });
})

/* ==== Deploy ==== */
gulp.task('deploy', function() {
  gulp.src('_gh_pages/**/*')
    .pipe(ghPages())
})

/* ==== Task Quences ==== */
gulp.task('dev', function(callback) {
  sequence(
  'styles',
  'styles-min',
  'scripts',
  'scripts-min',
  'fonts'
  )(callback)
})

gulp.task('docs', function(callback) {
  sequence(
  'docs-jade',
  'docs-styles',
  'docs-scripts'
  )(callback)
})

gulp.task('build', function(callback) {
  sequence(
  'clean',
  'dev',
  'docs'
  )(callback)
})

gulp.task('default', ['build'])
