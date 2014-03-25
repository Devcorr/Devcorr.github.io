var gulp = require('gulp');

//plugins
var imagemin = require('gulp-imagemin');	
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var closureCompiler = require('gulp-closure-compiler');
var minifyCSS = require('gulp-minify-css');

var projectRoot = '../www/';
var paths = {
	scripts: projectRoot + 'js/**/*',
	scss: projectRoot + 'scss/',
	css: projectRoot + 'css/',
	fonts: projectRoot + 'fonts/',
	images: projectRoot + 'images/'
};

gulp.task(['update-dev-branch'], shell.task([
	'git pull'
]));

gulp.task('compress-scripts', ['update-dev-branch'], function() {
	return gulp.src([paths.scripts + '*-ck.js', paths.scripts + 'custom.modernizr.js'])
		.pipe(closureCompiler({language_in: 'ECMASCRIPT5_STRICT'}))
		.pipe(gulp.dest(projectRoot+'js'));
});

gulp.task('optimize-images', ['update-dev-branch'], function() {
	return gulp.src(paths.images + '*.png')
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(paths.images));
});

gulp.task('compile-sass', ['update-dev-branch'], function() {
	return gulp.src(paths.scss + '*.scss')
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

gulp.task('compress-css', ['compile-sass'], function() {
	return gulp.src(paths.css + '*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.css));
});

gulp.task('deploy-to-github', ['update-dev-branch','compress-scripts','optimize-images','compress-css'], shell.task([
	'git commit -m "deploying to github pages"',
	'git push origin dev',
	'git checkout master',
	'git reset --hard dev',
	'cp ' + projectRoot + 'index.html ../index.html && cp ' + projectRoot + 'robots.txt ../robots.txt',
	"find " + paths.scripts + " -type f -not -name '*-ck.js' -and -not -name 'custom.modernizr.js' | xargs rm",
	'cp ' + paths.scripts + '../js',
	'cp ' + paths.css + '../css',
	'cp ' + paths.fonts + '../fonts',
	'cp ' + paths.images + '../images',
	'rm -rf ../ansible ../www',
	'rm tumblr.html Vagrantfile'
]));

gulp.task('default', ['deploy-to-github']);
