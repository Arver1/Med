'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();


gulp.task('serv', () => {
  browserSync.init({
    server: './',
    index: 'index.html'
  });
  browserSync.watch('*.html').on('change', browserSync.reload);
});

