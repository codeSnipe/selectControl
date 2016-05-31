var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin');
gulp.task('default',['uglify','cssmin'],function(){
});
gulp.task('jshint',function(){
   return gulp.src("develop/*.js")
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});
gulp.task('uglify',function(){
    return gulp.src('develop/*.js')
        .pipe(uglify())
        .pipe(rename(function(path){
            path.extname = ".min.js"
        }))
        .pipe(gulp.dest('release'));
});
gulp.task('cssmin',function(){
   return gulp.src('develop/*.css')
       .pipe(cssmin())
       .pipe(rename(function(path){
           path.extname = '.min.css';
       }))
       .pipe(gulp.dest('release'));
});