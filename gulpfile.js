var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  twig = require('gulp-twig'),
  postcss = require('gulp-postcss'),
  htmlmin = require('gulp-htmlmin'),
  fs = require('fs'),
  uglify = require('gulp-uglify'),
  cssnano = require('gulp-cssnano'),
  browserSync = require('browser-sync').create();

//Paths of CSS Files to concat them
var cssSRC = [
  './src/css/swiper.css',
  //'./src/css/ms-dropdown.css',
  //'./src/css/validetta.css',
  './temp/css/main.css',
];

//Specify the index file path for browser-sync
var localhostDir = 'http://localhost/My/MyWorks/atolye15/dist/index.html';

//Paths of JS Files to concat them
var jsSRC = [
  //'./src/js/select.js',
  './src/js/swiper.min.js',
  './src/js/jquery-3.4.1.min.js',
  //'./src/js/ms-dropdown.min.js',
  //'./src/js/validetta.js',
];

//Paths of Fonts
var fonts = {
  src: './src/fonts/*',
  dest: './dist/assets/fonts/',
};

//Sources and Destinations of Assets
var paths = {
  styles: {
    scss: {
      src: './src/scss/*.scss',
    },
    temp: {
      dest: './temp/css/',
    },
    concat: {
      cssdest: './dist/assets/css/',
      jsdest: './dist/assets/js/',
    },
  },
  img: {
    src: './src/img/*',
    dest: './dist/assets/img/',
    favicon: {
      src: './src/img/favicon/*',
      dest: './dist/assets/img/favicon/',
    },
    icons: {
      src: './src/img/icons/*',
      dest: './dist/assets/img/icons/',
    },
  },
  twig: {
    src: './src/templates/pages/*.twig',
    dest: './dist/',
    data: {
      src: './src/data/',
    },
  },
  html: {
    src: './src/html/*',
    dest: './dist/',
  },
  sitemap: {
    src: './dist/*.html',
  },
};

//To copy fonts to dist directory
function copy() {
  return gulp.src(fonts.src).pipe(gulp.dest(fonts.dest));
}

//Compiling Sass and creating sourcemaps
function css() {
  return gulp
    .src(paths.styles.scss.src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.temp.dest));
}

//Concating all css files, minifying the css file and creating sourcemap
function concatCSS() {
  return gulp
    .src(cssSRC)
    .pipe(
      sourcemaps.init({
        loadMaps: true,
        largeFile: true,
      }),
    )
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.concat.cssdest))
    .pipe(browserSync.stream());
}

//Concating all js files and creating sourcemap
function concatJS() {
  return gulp
    .src(jsSRC)
    .pipe(
      sourcemaps.init({
        loadMaps: true,
        largeFile: true,
      }),
    )
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.concat.jsdest));
}

//Optimizer the images
function imgmin() {
  return (
    gulp
      .src(paths.img.src)
      .pipe(changed(paths.img.dest))
      .pipe(
        imagemin([
          imagemin.gifsicle({
            interlaced: true,
          }),
          imagemin.jpegtran({
            progressive: true,
          }),
          imagemin.optipng({
            optimizationLevel: 5,
          }),
        ]),
      )
      .pipe(gulp.dest(paths.img.dest)),
    gulp
      .src(paths.img.favicon.src)
      .pipe(changed(paths.img.favicon.dest))
      .pipe(
        imagemin([
          imagemin.gifsicle({
            interlaced: true,
          }),
          imagemin.jpegtran({
            progressive: true,
          }),
          imagemin.optipng({
            optimizationLevel: 5,
          }),
        ]),
      )
      .pipe(gulp.dest(paths.img.favicon.dest))
  );
}

//twig to uncompressed html
function twigHtml() {
  return gulp
    .src(paths.twig.src)
    .pipe(twig())
    .on('error', function(err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest(paths.twig.dest))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch('./src/scss/**/*.scss', gulp.series([css, concatCSS]));
  gulp.watch('./src/scss/**/*.twig', gulp.series([twigHtml]));
  gulp.watch('./src/templates/**/*.twig', gulp.series([twigHtml]));
  browserSync.init({
    open: 'external',
    proxy: localhostDir,
    port: 8080,
  });
}

exports.copy = copy;
exports.css = css;
exports.concatCSS = concatCSS;
exports.concatJS = concatJS;
exports.imgmin = imgmin;
exports.twigHtml = twigHtml;
exports.watch = watch;

var build = gulp.parallel(gulp.series([copy, css, concatCSS, concatJS, imgmin, twigHtml]));
gulp.task('default', build);
