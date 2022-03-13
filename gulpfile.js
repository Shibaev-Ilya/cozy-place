'use strict';

var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  del = require('del'),
  gcmq = require('gulp-group-css-media-queries'),
  sassGlob = require('gulp-sass-glob');

var path = {
  src: {
    js: './_source/js/**/*.js',
    style: './_source/style/**/*\.scss',
    css: './_source/style/**/*\.css',
    img: './_source/img/**/*.*',
    font: './_source/fonts/**/*\.*',
  },
  build: {
    js: './assets/js/',
    style: './assets/css/',
    css: './assets/css/',
    img: './assets/img/',
    font: './assets/fonts/',
  }
};

// Clean assets
function clean() {
  return del(["assets"]);
}

function jsBuild() {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js));
};

function styleBuild() {
  return gulp.src(path.src.style)
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(prefixer({ overrideBrowserslist: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'], cascade: false }))
    .pipe(gcmq())
    .pipe(cssnano({zindex: false}))
    .pipe(gulp.dest(path.build.style));
};

function cssBuild() {
  return gulp.src(path.src.css)
    .pipe(prefixer({ overrideBrowserslist: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'], cascade: false }))
    .pipe(cssnano({zindex: false}))
    .pipe(gulp.dest(path.build.css));
};


function imgBuild() {
  return gulp.src(path.src.img)
    .pipe(imagemin())
    .pipe(rename(function (path) {
      path.extname = (path.extname + "").toLowerCase();
    }))
    .pipe(gulp.dest(path.build.img));
};

function fontBuild() {
  return gulp.src(path.src.font)
    .pipe(gulp.dest(path.build.font));
};


gulp.task('build',
  gulp.series(clean, gulp.parallel(
    jsBuild,
    styleBuild,
    cssBuild,
    imgBuild,
    fontBuild,
)));

gulp.task('watchFiles', function () {

  gulp.watch([path.src.js], jsBuild);

  gulp.watch([path.src.style], styleBuild);

  gulp.watch([path.src.css], cssBuild);

  gulp.watch([path.src.img], imgBuild);

  gulp.watch([path.src.font], fontBuild);


});

gulp.task('default', gulp.parallel(gulp.series('build', 'watchFiles')));
