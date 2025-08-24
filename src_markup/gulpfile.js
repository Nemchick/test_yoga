var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  nunjucksRender = require('gulp-nunjucks-render'),
  htmlclean = require('gulp-htmlclean'),
  sass = require('gulp-dart-sass')
;(postcss = require('gulp-postcss')),
  (postcssPresetEnv = require('postcss-preset-env')),
  (mqpacker = require('css-mqpacker')),
  (sortCSSmq = require('sort-css-media-queries')),
  (guglify = require('gulp-uglify-es').default),
  (order = require('gulp-order')),
  (concat = require('gulp-concat')),
  (debug = require('gulp-debug')),
  (plumber = require('gulp-plumber')),
  (rename = require('gulp-rename')),
  (sourcemaps = require('gulp-sourcemaps')),
  (changed = require('gulp-changed')),
  (gulpCopy = require('gulp-copy')),
  (cache = require('gulp-cache')),
  (autoprefixer = require('gulp-autoprefixer')),
  (image = require('gulp-image')),
  (iconfont = require('gulp-iconfont')),
  (iconfontCss = require('gulp-iconfont-css')),
  (del = require('del')),
  (beautify = require('gulp-jsbeautifier'))

// Clearing cache
gulp.task('clear', function (done) {
  cache.clearAll()
  console.log('Cache cleared')
  done()
})

// Copying Index ./dev/index.html => ./dist/index.html
gulp.task('index', function () {
  return gulp
    .src('index.html')
    .pipe(gulpCopy('../markup'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Rendering HTML ./dev/blocks/**/* => ./dev/pages/**/*  => ./dist
gulp.task('html', function () {
  return gulp
    .src('pages/**/*.html')
    .pipe(
      plumber(function (error) {
        console.log('')
        console.log('*************** NUNJUCKS ERROR ***************')
        console.log(error.fileName)
        console.log(error.message)
        console.log('********************************************')
        console.log('')
        this.emit('end')
      })
    )
    .pipe(
      nunjucksRender({
        path: ['blocks'],
      })
    )
    .pipe(
      htmlclean({
        protect: /<!--%fooTemplate\b.*?%-->/g,
        edit: function (html) {
          return html.replace(/\begg(s?)\b/gi, 'omelet$1')
        },
      })
    )
    .pipe(plumber.stop())
    .pipe(beautify())
    .pipe(gulp.dest('../markup/pages'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Rendering modals ./source/blocks/modals/* => ./markup/pages/modals/*
gulp.task('modals', function () {
  return gulp
    .src('blocks/modals/*.html')
    .pipe(
      plumber(function (error) {
        console.log('')
        console.log('*************** NUNJUCKS ERROR ***************')
        console.log(error.fileName)
        console.log(error.message)
        console.log('********************************************')
        console.log('')
        this.emit('end')
      })
    )
    .pipe(
      nunjucksRender({
        path: ['blocks'],
      })
    )
    .pipe(plumber.stop())
    .pipe(beautify())
    .pipe(gulp.dest('../markup/pages/modals'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Compiling SCSS into CSS ./source/scss/init.scss => ./markup/css/init.css
gulp.task('scss', function () {
  var processors = [
    postcssPresetEnv(),
    mqpacker({
      sort: sortCSSmq,
    }),
  ]

  return gulp
    .src(['scss/init.scss'])
    .pipe(
      autoprefixer({
        grid: true,
      })
    )
    .pipe(
      plumber(function (error) {
        console.log('')
        console.log('*************** SCSS ERROR ***************')
        console.log('scss:', error.message)
        console.log('********************************************')
        console.log('')
        this.emit('end')
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        compress: true,
      })
    )
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('../maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('../markup/css/'))
    .pipe(gulp.dest('../assets/css/'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Bundling JS ./source/js/**/* => ./markup/js
gulp.task('jquery-transfer', function () {
  function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
  }
  return gulp
    .src(['**/jquery-3.3.1.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('jquery.js'))
    .pipe(
      guglify({
        compress: {
          hoist_funs: false,
          hoist_vars: false,
        },
      })
    )
    .on('error', swallowError)
    .pipe(sourcemaps.write('../maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('../markup/js/'))
    .pipe(gulp.dest('../assets/js/'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Bundling JS ./dev/js/**/* => ./dist/js
gulp.task('uglify', function () {
  function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
  }
  return gulp
    .src(['js/**/*.js', '!js/*.js', 'js/main.js', '!**/jquery-3.3.1.min.js'])
    .pipe(
      plumber(function (error) {
        console.log('uglify:', error.message)
        this.emit('end')
      })
    )
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(
      guglify({
        compress: {
          hoist_funs: false,
          hoist_vars: false,
        },
      })
    )
    .on('error', swallowError)
    .pipe(sourcemaps.write('../maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('../markup/js/'))
    .pipe(gulp.dest('../assets/js/'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Bundling JS root scripts ./source/js/* => ./markup/js
gulp.task('uglify--root', function () {
  function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
  }
  return gulp
    .src(['js/*.js', '!js/main.js'])
    .pipe(
      plumber(function (error) {
        console.log('uglify:', error.message)
        this.emit('end')
      })
    )
    .pipe(
      guglify({
        compress: {
          hoist_funs: false,
          hoist_vars: false,
        },
      })
    )
    .on('error', swallowError)
    .pipe(plumber.stop())
    .pipe(gulp.dest('../markup/js/'))
    .pipe(gulp.dest('../assets/js/'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Optimizing images ./dev/blocks/**/*.{jpg,png,svg,gif}, ./dev/img/**/*.{jpg,png,svg,gif} => ./dist/img
gulp.task('img', function () {
  return gulp
    .src(['img/**/*.{jpg,png,svg,gif}', 'blocks/**/*.{jpg,png,svg,gif}'])

    .pipe(
      rename(function (path) {
        path.dirname = path.dirname.replace('img', '')
      })
    )
    .pipe(changed('./../markup/img'))
    .pipe(gulp.dest(['./../markup/img']))
    .pipe(gulp.dest(['./../assets/img']))
})

// Generating iconfont ./dev/icons/**/*.svg => ./dist/fonts/iconfont
gulp.task('iconfont', function () {
  const runTimestamp = Math.round(Date.now() / 1000)
  const fontName = 'iconfont'
  del.sync(['./../markup/fonts/'], { force: true })
  return gulp
    .src(['icons/**/*.svg'])

    .pipe(
      iconfontCss({
        fontName: fontName,
        path: './scss/base/_' + fontName + '-template.scss',
        targetPath: './../../../src_markup/scss/base/' + fontName + '.scss',
        fontPath: '../../fonts/' + fontName + '/',
        cssClass: 'icon',
        centerHorizontally: true, //,
      })
    )
    .pipe(
      iconfont({
        fontName: fontName, // required
        fontWeight: 400,
        fontHeight: 1000,
        normalize: true,
        formats: ['ttf', 'eot', 'woff', 'woff2'],
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
      })
    )
    .pipe(gulp.dest('./../markup/fonts/' + fontName + '/'))
    .pipe(gulp.dest('./../assets/fonts/' + fontName + '/'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Copying fonts ./dev/fonts/**/* => ./dist/fonts
gulp.task('fonts', function () {
  return gulp
    .src(['fonts/**/*'])
    .pipe(gulp.dest('./../markup/fonts/'))
    .pipe(gulp.dest('./../assets/fonts/'))
    .on('end', function () {
      browserSync.reload()
    })
})

// Watching files
gulp.task('watch', function () {
  gulp.watch(
    ['blocks/**/*.html', 'pages/**/*.html'],
    gulp.series(['html', 'modals', 'clear'])
  )
  gulp.watch(['index.html'], gulp.series(['index', 'clear']))
  gulp.watch(['js/**/*.js', 'blocks/**/*.js'], gulp.series(['uglify', 'clear']))
  gulp.watch(['fonts/*.*', '!fonts/iconfont'], gulp.series(['fonts', 'clear']))
  gulp.watch(
    ['img/**/*.{jpg,png,svg,gif}', 'blocks/**/*.{jpg,png,svg,gif}'],
    gulp.series(['img', 'clear'])
  )
  gulp.watch(['icons/**/*'], gulp.series(['iconfont', 'fonts', 'clear']))
  gulp.watch(['**/*.scss'], gulp.series(['scss', 'clear']))
  browserSync.init({
    server: {
      baseDir: '../markup',
    },
  })
})

// Combining tasks into Default task
gulp.task(
  'default',
  gulp.series(
    gulp.parallel(
      'index',
      'html',
      'modals',
      'scss',
      'jquery-transfer',
      'uglify',
      'uglify--root',
      'img',
      'iconfont',
      'fonts'
    ),
    'scss',
    'watch'
  )
)
