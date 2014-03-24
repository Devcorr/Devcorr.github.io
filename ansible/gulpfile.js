var gulp = require('gulp');

//plugins
var imagemin = require('gulp-imagemin');	
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var closureCompiler = require('gulp-closure-compiler');
var minifyCSS = require('gulp-minify-css');

var projectRoot = '../';
var paths = {
	scripts: projectRoot + 'js/**/*',
	scss: projectRoot + 'scss/',
	css: projectRoot + 'css/',
	fonts: projectRoot + 'fonts/',
	images: projectRoot + 'images/'
};

gulp.task('compress-scripts', function() {
	return gulp.src([paths.scripts + '*-ck.js', paths.scripts + 'custom.modernizr.js'])
		.pipe(closureCompiler({language_in: 'ECMASCRIPT5_STRICT'}))
		.pipe(gulp.dest(projectRoot+'js'));
});

gulp.task('optimize-images', function() {
	return gulp.src(paths.images + '*.png')
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(paths.images));
});

gulp.task('compile-sass', function() {
	return gulp.src(paths.scss + '*.scss')
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

gulp.task('compress-css', ['compile-sass'], function() {
	return gulp.src(paths.css + '*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.css));
});

gulp.task('github-deployment', ['compress-scripts','optimize-images','compile-sass', 'compress-css'], shell.task([
	'git status',
	'git stash',
	'git checkout master',
	'git stash pop',
	'git add -f --all',
	'now=date',
	'git commit -m "deployment executed $now"',
	'git push origin master',
	'git checkout dev',
	'git stash clear'
]));

gulp.task('default', ['compress-scripts','optimize-images','compile-sass', 'compress-css']);