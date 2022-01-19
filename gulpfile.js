//gulp template for required structure ==========================
"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
function buildStyles() {
    return gulp
        .src("./src/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./src/css"));
}

//prettier-ignore
function goPublic(cb) {
    (function () {
        return [
            gulp.src("./src/index.html").pipe(gulp.dest("./dist")), //copies the html to dist
            gulp.src("./src/js/**/*.{js,jsx}").pipe(gulp.dest("./dist/scripts/")), // copies js to dist
            gulp.src("./src/img/**/*.{jpg,png,svg,gif,ico,webp}").pipe(gulp.dest("./dist/img")), //copies imgs to dist
            gulp.src("./src/css/*").pipe(gulp.dest("./dist/css")), // copy generated css to dist
        ];
    })();
    cb();
}
exports.goPublic = goPublic;
exports.buildStyles = buildStyles;
exports.watch = function () {
    gulp.watch(
        ["./src/scss/**/*.scss", "./src/*.html"],
        gulp.series(["buildStyles", "goPublic"])
    );
};