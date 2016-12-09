'use strict';

const gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

gulp.task('css', function() {
	return gulp.src('./source/less/**/*.less')
			.pipe(less())
			.pipe(concat('all.css'))
			.pipe(cssmin())
			.pipe(gulp.dest('./destination/css'));
});

gulp.task('js', function () {
	return gulp.src('./source/js/**/*.js')
			.pipe(concat('script.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./destination/js'));
});

gulp.task('build', function(){
	gulp.run('css', 'js');

	gulp.watch('./source/js/*.js', function(){
		gulp.run('js');
	});

	gulp.watch('./source/less/*.less', function(){
		gulp.run('css');
	});
});