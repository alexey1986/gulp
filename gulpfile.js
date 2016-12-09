'use strict';

const gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create();

gulp.task('styles', function() {
	return gulp.src('./source/less/**/*.less')
			.pipe(less())
			.pipe(concat('all.min.css'))
			.pipe(cssmin())
			.pipe(gulp.dest('./destination/css'));
});

gulp.task('scripts', function () {
	return gulp.src('./source/js/**/*.js')
			.pipe(concat('script.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./destination/js'));
});

gulp.task('html', function () {
	return gulp.src('./source/index.html')
			.pipe(gulp.dest('./destination'));
});

gulp.task('build', ['styles', 'scripts', 'html'], function () {
    browserSync.init({
        server: ['./destination']
    });

    gulp.watch(['./source/less/*.less'], ['styles', browserSync.reload]);
    gulp.watch(['./source/js/*.js'], ['scripts', browserSync.reload]);
    gulp.watch(['./source/index.html'], ['html', browserSync.reload]);
});