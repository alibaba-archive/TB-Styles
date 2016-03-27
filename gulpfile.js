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
var livereload   = require('gulp-livereload')
var autoprefixer = require('gulp-autoprefixer')

var fs           = require('fs')
var map          = require('vinyl-map')
var pureJade     = require('jade')
var frontMatter  = require('front-matter')
var marked       = require('marked')
var merge2       = require('merge2')

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
  // Amount: 12
  return gulp.src([
      'transition.js',
      'alert.js',
      'button.js',
      'carousel.js',
      'collapse.js',
      'dropdown.js',
      'modal.js',
      'tooltip.js',
      'popover.js',
      'scrollspy.js',
      'tab.js',
      'affix.js'
    ], {cwd: 'node_modules/bootstrap-styl/js/'})
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

gulp.task('docs-contents', function () {
  var tpl = fs.readFileSync('src/docs/templates/content.jade')
  var jadeTpl = pureJade.compile(tpl, {
    basedir: __dirname + "/src/docs/templates",
    pretty: true
  })
  var renderPost = map(function(code, filename) {
    var parsed = frontMatter(String(code))
    var data = parsed.attributes
    var body = parsed.body
    var readme = fs.readFileSync('README.md', 'utf8')

    // marked.setOptions({
    //   breaks: true
    // })

    body = marked.parse(data.title === 'Introduction' ? readme : body)
    data.content = body
    data.filename = filename
    return jadeTpl(data)
  })

  gulp.src('src/docs/contents/**/*.md')
    .pipe(renderPost)
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('_gh_pages/'))
    .pipe(connect.reload())
})

gulp.task('docs-styles', function () {
  merge2(
    gulp.src('dist/styles/ui.css'),
    gulp.src('src/docs/styles/main.styl')
    .pipe(stylus({
      'include css': true,
      'paths': ['./node_modules']
    }))
    )
    // .pipe(concat('build.css'))
    .pipe(csso())
    .pipe(gulp.dest('_gh_pages/styles/'))
    .pipe(connect.reload())
})

gulp.task('docs-scripts', function () {
  merge2(
    gulp.src('node_modules/jquery/dist/jquery.js'),
    gulp.src('dist/scripts/ui.js'),
    gulp.src('src/docs/scripts/*.js')
  )
  .pipe(concat('build.js'))
  .pipe(uglify())
  .pipe(gulp.dest('_gh_pages/scripts/'))
  .pipe(connect.reload())
})

gulp.task('docs-fonts', function () {
  gulp.src('dist/fonts/**')
    .pipe(gulp.dest('_gh_pages/fonts/'))
})

/* ==== Watch & Serve ==== */
gulp.task('watch', function () {
  gulp.watch('src/styles/**/*', ['styles', 'docs'])
  gulp.watch(['src/docs/contents/**/*', 'src/docs/templates/**'], ['docs-contents'])
  gulp.watch('src/docs/styles/**', ['docs-styles'])
  gulp.watch('src/docs/scripts/**', ['docs-scripts'])
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
  'docs-contents',
  'docs-styles',
  'docs-scripts',
  'docs-fonts'
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
