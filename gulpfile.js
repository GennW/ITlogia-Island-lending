'use strict';

const gulp = require("gulp");
const less = require("gulp-less");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const watch = require("gulp-watch");

function compileLess() {
  return gulp
    .src("src/styles/style.less")
    .pipe(less().on("error", console.error))
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/style"));
}

function watchFiles() {
  return watch("src/styles/style.less", compileLess);
}

exports.default = gulp.series(compileLess, watchFiles);