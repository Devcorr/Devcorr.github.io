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


gulp.task('stash', shell.task([
	'git stash'
]));

gulp.task('checkout-master', ['stash'], shell.task([
	'git checkout master'
]));

gulp.task('apply-changes', ['checkout-master'], shell.task([
	'git stash pop'
]));

gulp.task('add-changes', ['apply-changes'], shell.task([
	'git add --all'
]));

gulp.task('commit', ['add-changes'], shell.task([
	'git commit -m /"deployment executed/"',
]));

gulp.task('push-master', ['commit'], shell.task([
	'git push origin master',
]));

gulp.task('checkout-dev', ['push-master'], shell.task([
	'git checkout dev',
]));

gulp.task('clear-stash', ['checkout-dev'], shell.task([
	'git stash clear'
]));

gulp.task('default', ['compress-scripts','optimize-images','compile-sass', 'compress-css']);