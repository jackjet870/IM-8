'use strict';
let packageJson = require('./package.json')
let version = packageJson.version
let config = require('./config/gulpconfig');

var gulp = require('gulp')
var webpack = require('webpack-stream')
var concat = require('gulp-concat')
var imagemin = require('gulp-imagemin')
var minifyCss = require('gulp-minify-css')
var mocha = require('gulp-mocha')   // 用于单元测试
var babel = require('gulp-babel')   // 用于ES6转化ES5
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')
var es2015 = require('babel-preset-es2015')
var rev = require('gulp-rev') //路径替换
var revCollector = require('gulp-rev-collector')
var clean = require('gulp-clean')
var gulpsync = require('gulp-sync')(gulp)

// websdk-{version}.js
gulp.task('sdk:js', function () {
    return gulp.src('./index.js')
        .pipe(webpack({
                output: {
                    filename: 'im-'+ version +'.js',
                    library: 'singleIM',
                    libraryTarget: 'umd'
                }
            })
        )
        .pipe(gulp.dest(config.js.dist));
});

// websdk-{version}.min.js
// websdk-{version}.min.js.map
gulp.task('sdk:js:min', ['sdk:js'], function () {
    return gulp.src(config.js.src + 'im.js?v=' + version)
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rename('im-'+ version +'.min.js'))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.js.dist))
});

//压缩js
gulp.task('js', function () {
    return gulp.src(config.js.src + '/*.js')
        .pipe(concat('im.js'))
        //.pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.js.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev.js));
});

//压缩css
gulp.task('css', function() {
    return gulp.src(config.css.src + '*.css')
        .pipe(concat('app.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(config.css.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev.css));
});

//压缩图片
gulp.task('images', function() {
    return gulp.src(config.images.src + '*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.dist));
});

gulp.task('copy', function(){
    return gulp.src(['./src/plugins/**/*'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist/plugins/'))
});

//替换路径
gulp.task('html:rev', function () {
    return gulp.src(['./config/rev/**/*.json', './src/**/*.html'])
        .pipe(revCollector({
            replaceReved : true
        }))
        .pipe(gulp.dest('dist/'));
});

// 清空文件夹
gulp.task('clean', function() {
    return gulp.src([config.clean.src], {read : false})
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('./src/pages/**/*.html', function(){
        gulp.run('html:rev');
    });
    gulp.watch('./src/assets/css/*.css', function(){
        gulp.run('css');
        gulp.run('html:rev');
    });
    gulp.watch('./src/assets/images/*.*', function(){
        gulp.run('images');
    });
    gulp.watch('./src/assets/js/*.js', function(){
        gulp.run('js');
        gulp.run('html:rev');
    });
});

gulp.task('default', gulpsync.sync(['clean', 'sdk:js', 'sdk:js:min', 'images', 'css', 'js', 'copy', 'html:rev', 'watch']));

//
// gulp.task('watch', function() {
//     livereload.listen(); //要在这里调用listen()方法
//     gulp.watch('less/*.less', ['less']);
// });