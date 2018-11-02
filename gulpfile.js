'use strict';
var gulp = require('gulp');
var run = require('gulp-run');
var replace = require('gulp-replace');
var runSequence = require('run-sequence').use(gulp);


gulp.task('default', function() {

});

gulp.task('sencha-build-testing', function() {
	return run('sencha app build testing').exec()
		.pipe(gulp.dest('output'));
});

gulp.task('insert-cordova-js', function() {
	return gulp.src(['build/testing/TestApp/index.html'])
		.pipe(replace(/<!--cordova-->/, function() {
			return '<script type="text/javascript" src="cordova.js"></script>';
		}, {
			skipBinary: true
		}))
		.pipe(gulp.dest('build/testing/TestApp'));
});
 
gulp.task('build', function() {
	runSequence('sencha-build-testing', 'insert-cordova-js');
})