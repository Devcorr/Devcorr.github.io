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

var now = new Date();
var day = now.getDate();
var month = now.getMonth() + 1;
var year = now.getFullYear();
today = month+'/'+day+'/'+year;

gulp.task('prepare-for-github', shell.task([
	'git branch -f master dev',
	'git checkout master',
	'git reset --hard dev',
]));

gulp.task('compress-scripts', ['prepare-for-github'], function() {
	return gulp.src([paths.scripts + '*-ck.js', paths.scripts + 'custom.modernizr.js'])
		.pipe(closureCompiler({language_in: 'ECMASCRIPT5_STRICT'}))
		.pipe(gulp.dest(projectRoot+'js'));
});

gulp.task('optimize-images',['prepare-for-github'], function() {
	return gulp.src(paths.images + '*.png')
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(paths.images));
});

gulp.task('compile-sass',['prepare-for-github'], function() {
	return gulp.src(paths.scss + '*.scss')
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

gulp.task('compress-css', ['compile-sass'], function() {
	return gulp.src(paths.css + '*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.css));
});

gulp.task('deploy-to-github', ['compress-scripts','optimize-images','compress-css'], shell.task([	
	'cp ' + projectRoot + 'index.html ../index.html && cp ' + projectRoot + 'robots.txt ../robots.txt',
	"find " + paths.scripts + " -type f -not -name '*-ck.js' -and -not -name 'custom.modernizr.js' | xargs rm",
	'cp -R ' + projectRoot + 'js/ ../js',
	'cp -R ' + paths.css + ' ../css',
	'cp -R ' + paths.fonts + ' ../fonts',
	'cp -R ' + paths.images + ' ../images',
	'rm ../tumblr.html ../Vagrantfile',
	'rm -rf ' + projectRoot,
	'find ../ansible/ -type f | xargs git update-index --assume-unchanged',
	'git add --all',
	"git commit -m 'deploying to github pages " + today + "'",
	'git push -f origin master'
]));

gulp.task('default', ['deploy-to-github']);