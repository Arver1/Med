'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const del = require('del');
const gulpNewer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV.trim() === 'development';
const webpack = require('webpack-stream');
const webpackConfig = require("./webpack.config.js");
const cleanCSS = require('gulp-clean-css');
gulp.task('sass', () =>
  gulp.src('src/scss/style.scss')
    .pipe(debug({title: 'src'}))
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(debug({title: 'scss'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(debug({title: 'autoprefixer'}))
    .pipe(cleanCSS())
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest('src/css'))
);

gulp.task('serv', () => {
  browserSync.init({
    server: './',
    index: 'index.html'
  });
  browserSync.watch('src/scss/*.scss').on('change', browserSync.reload);
  browserSync.watch('*.html').on('change', browserSync.reload);
  browserSync.watch('src/img/*.*').on('all', browserSync.reload);
  browserSync.watch('src/js/*.*').on('change', gulp.series('webpack', 'reload'));
});

gulp.task('watch', () => {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('clean', () =>
  del('public')
);

gulp.task('img', () =>
  gulp.src('src/img/*.*', {since: gulp.lastRun('img')})
    .pipe(gulpNewer('build/src/img'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('build/src/img'))
);

gulp.task('html', () =>
  gulp.src('*.html', {since: gulp.lastRun('html')})
    .pipe(gulpNewer('build'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
);

gulp.task('css', () =>
  gulp.src('build/css/*.css', {since: gulp.lastRun('css')})
    .pipe(gulpNewer('build/css'))
    .pipe(gulp.dest('build/css'))
);

gulp.task('mincss', () =>
  gulp.src('src/css/style.css', {since: gulp.lastRun('css')})
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/src/css'))
);

gulp.task('webpack', () =>
  gulp.src('./src/js/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./src/js'))
);

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/src/fonts'));
});

gulp.task('js', () =>
  gulp.src('src/js/main.js', {since: gulp.lastRun('js')})
    .pipe(gulpNewer('build/src/js'))
    .pipe(gulp.dest('build/src/js'))
);

gulp.task('build', gulp.series('clean', gulp.parallel('img','html'),'sass', 'mincss', 'css', 'fonts','webpack', 'js'));
gulp.task('dev', gulp.series('sass', 'webpack', gulp.parallel('serv','watch')));
