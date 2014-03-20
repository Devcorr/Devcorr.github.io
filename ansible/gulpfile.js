var gulp = require('gulp');

//plugins
var imagemin = require('gulp-imagemin');	
var sass = require('gulp-sass');
var git = require('gulp-git');
var closureCompiler = require('gulp-closure-compiler');

var projectRoot = '../www/';
var paths = {
	scripts: projectRoot + 'js/**/*',
	scss: projectRoot + 'scss/',
	css: projectRoot + 'css/**/*',
	fonts: projectRoot + 'fonts/**/*',
	images: projectRoot + 'images/'
};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(closureCompiler({language_in: 'ECMASCRIPT5_STRICT'}))
		.pipe(gulp.dest(projectRoot+'js'));
});

gulp.task('images', function() {
	return gulp.src(paths.images + '*.png')
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(projectRoot+'images'));
});

gulp.task('sass', function() {
	return gulp.src(paths.scss + '*.scss')
		.pipe(sass())
		.pipe(gulp.dest(projectRoot+'css'));
});

gulp.task('default', ['scripts','images','sass']);