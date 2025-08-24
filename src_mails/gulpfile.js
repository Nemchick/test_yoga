'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const htmlmin = require('gulp-htmlmin')
const mjml = require('gulp-mjml')
const pug = require('gulp-pug')
const rename = require('gulp-rename')

// Configs
let inputPath = './source/views/*.pug'
let inputPathWatch = './source/views/*/**.pug'
let tempPath = './temp'
let tempPathMJML = './temp/*.mjml'
let tempPathIMG = './source/img/*'
let outputPath = './build'
let outputPathIMG = './build/img'
let tempPathTrigger = './source/views/_includes/triggers/*.pug'
let outputPathMJMLTrigger = './temp/triggers/'
let outputPathTrigger = './build/triggers/'

gulp.task('build', () => {
  return gulp
    .src(inputPath)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(
      rename({
        extname: '.mjml',
      })
    )
    .pipe(gulp.dest(tempPath))
    .pipe(mjml())
    .pipe(gulp.dest(outputPath))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .on('end', function () {
      browserSync.reload()
    })
})

gulp.task('mjml', () => {
  return gulp
    .src(tempPathMJML)
    .pipe(mjml())
    .pipe(gulp.dest(outputPath))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
})

gulp.task('img', () => {
  return gulp.src(tempPathIMG).pipe(gulp.dest(outputPathIMG))
})

// gulp.task('trigger', () => {
//     return gulp.src(tempPathTrigger)
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(rename({
//             extname: '.mjml'
//         }))
//         .pipe(gulp.dest(outputPathMJMLTrigger))
//         .pipe(mjml())
//         .pipe(gulp.dest(outputPathTrigger))
// });

gulp.task('browser-sync', (cb) => {
  browserSync(
    {
      server: {
        baseDir: outputPath,
      },
      port: 4000,
    },
    cb
  )
})

gulp.task('watch', () => {
  return gulp.watch(
    inputPathWatch,
    gulp.series(
      'build'
      // 'trigger'
    )
  )
})

gulp.task(
  'default',
  gulp.series(
    'build',
    'img',
    // 'trigger',
    'browser-sync',
    'watch'
  )
)
