/*** User: Daqi / Date: 2018/4/18 / Time: 21:18 ***/

//gulp的主文件,用于注册任务
"use strict";

//载入gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//注册一个任务
gulp.task('copy',function () {
    //当gulp执行这个say任务时会自动执行该函数
    // console.log('hello');
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream:true
        }))
});


gulp.task('dist',function () {
    // gulp.watch('src/index.html',['copy']);
    gulp.watch('src/styles/*.less',['style']);
    // gulp.watch('src/index.html',['bserve']);
});

gulp.task('style',function(){
    gulp.src('src/styles/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
var browserSync = require('browser-sync').create();

// Static server
gulp.task('bserve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/*.html',['copy']);
});