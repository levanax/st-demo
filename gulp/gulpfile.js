'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var run = require('gulp-run');
/**
 * note: options.prefix {boolean}
 */
var gulpCopy = require('gulp-copy');
var runSequence = require('run-sequence');
var del = require('del');
var fs = require('fs');


gulp.task('default', function() {
	var cmd = new run.Command('sencha app build app.');  // create a command object for `cat`.
	cmd.exec('echo Hello World');   
});


gulp.task('sass', function(arg0, arg1) {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('dist'));
});


gulp.task('useref', function() {
	return gulp.src('./*.+(html|htm)')
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});



gulp.task('modify', function() {
	gulp.src('./test.js')
		// .pipe(replace(/{color}/,'testtesttest',{
		// 	skipBinary:true
		// }))
		.pipe(replace(/{color}/, function(arg0, arg1, arg2) {
			console.log(arg0, arg1, arg2)
			return 'ttttttttttttttttttttt';
		}, {
			skipBinary: true
		}))
		.pipe(gulp.dest('./'))
});



gulp.task('copy', function() {
	gulp.src('./test.js')
		.pipe(replace(/{color}/, function(arg0, arg1, arg2) {
			console.log(arg0, arg1, arg2)
			return 'ttttttttttttttttttttt';
		}, {
			skipBinary: true
		}))
		.pipe(gulpCopy('./dist1/', {
			prefix: 'test-'
		}))
		.pipe(gulp.dest('./'))
});



gulp.task('step1', function() {
	console.log('step1');
});
gulp.task('step2', function() {
	console.log(gulp.env.path) //'abc'
	console.log('step2');
});
gulp.task('start', ['step1', 'step2'], function() {
	console.log(gulp.env.path) //'abc'
	console.log('start');
});
//gulp start --path 'abc'



gulp.task('update-config', function() {

});
gulp.task('copy-to-target', function() {

});
gulp.task('build-red', function() {

});

var styles = ['red', 'black'];

gulp.task('test', function() {
	for (var i = 0, length = styles.length; i < length; i++) {
		(function(i) {
			var style = styles[i];
			console.log('in for ' + style);

			gulp.src('./test.js')
				.pipe(replace(/{color}/, function(arg0, arg1, arg2) {
					console.log(style)
					return style;
				}, {
					skipBinary: true
				}))
				.pipe(gulp.dest('./cache/' + style))
				.pipe(gulpCopy('dist/' + style + '/'), {
					prefix: true
				})
		})(i)
	}
});