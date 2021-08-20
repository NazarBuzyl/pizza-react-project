'use strict'
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssnano'),
    sourceMaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    babel = require('gulp-babel'),
    minify = require('gulp-minify'),
    rename = require("gulp-rename");

var path = {
    build: {
        html: './build/',
        js: './build/js/',
        css: './build/css/',
        images: './build/image/',
        fonts: './build/css/fonts/',
    },
    src: {
        html: './src/[^_]*.html',
        js: './src/js/**/*.js',
        css: './src/css/**/*.{scss,css}',
        images: './src/image/**',
        fonts: './src/css/fonts/**',
    },
    watch: {
        html: './src/**/*.html',
        js: './src/js/**/*.js',
        images: './src/image/**/*.{png,jpg,svg,gif}',
        css: './src/css/**/*.{scss,css}'
    },
    clean: './build'
};

gulp.task("webserver", function () {
    return browserSync({
        /*proxy: "my.web.local",*/
        host: 'localhost',
        port: 3000,
        tunnel: false,
        server: path.build.html
    });
});

gulp.task("html:build", function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task("images:build", function () {
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({
            stream: true
        }));
});

gulp.task("fonts:build", function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({
            stream: true
        }));
});

gulp.task("js:build", function () {
    return gulp.src(path.src.js)
        .pipe(sourceMaps.init())
        .pipe(sourceMaps.write())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            },
            exclude: ['lib'],
            ignoreFiles: ['.combo.js', '-min.js', 'lib.js']
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task("js:prod", function () {
    return gulp.src(path.src.js)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            },
            exclude: ['lib'],
            ignoreFiles: ['.combo.js', '-min.js', 'lib.js']
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task("style:prod", function () {
    return gulp.src(path.src.css)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.build.css));
});

gulp.task("style:build", function () {
    return gulp.src(path.src.css)
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task("build", gulp.parallel(
    'html:build',
    'js:build',
    'style:build',
    'images:build',
    'fonts:build'
));

gulp.task("buildProd", gulp.parallel(
    'html:build',
    'js:prod',
    'style:prod',
    'images:build',
    'fonts:build'
));

gulp.task("watch", function () {
    watch([path.watch.js], gulp.parallel('js:build'));
    watch([path.watch.html], gulp.parallel('html:build'));
    watch([path.watch.css], gulp.parallel('style:build'));
    watch([path.watch.images], gulp.parallel('images:build'))
});

gulp.task("clean", function (callback) {
    return rimraf(path.clean, callback);
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));

gulp.task('prod', gulp.series('clean', gulp.parallel('buildProd')));
