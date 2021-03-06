var gulp = require('gulp');

//plugins
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
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
var hours = now.getHours();
var minutes = now.getMinutes();
if (minutes < 10) { minutes = '0'+minutes; }
today = month+'/'+day+'/'+year+':'+hours+':'+minutes;

gulp.task('prepare-for-github', shell.task([
	'git branch -f master dev',
	'git checkout master',
	'git reset --hard dev',
]));

gulp.task('compress-scripts', ['prepare-for-github'], function() {
	return gulp.src(paths.scripts + '*.js')
		.pipe(uglify())
		.pipe(gulp.dest(projectRoot+'js'));
});

gulp.task('optimize-images',['prepare-for-github'], function() {
	return gulp.src(paths.images + '*.png')
		.pipe(imagemin({ optimizationLevel: 3 }))
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

gulp.task('deploy-to-github', ['compress-scripts','compress-css'], shell.task([
	//'cp ' + projectRoot + 'CNAME ../CNAME',
	'cp ' + projectRoot + 'index.html ../index.html && cp ' + projectRoot + 'robots.txt ../robots.txt',
	'cp -R ' + projectRoot + 'js/ ../js',
	'cp -R ' + paths.css + ' ../css',
	'cp -R ' + paths.fonts + ' ../fonts',
	'cp -R ' + paths.images + ' ../images',
	'rm ../tumblr.html ../Vagrantfile ../README.md',
	'rm -rf ' + projectRoot,
	'git add --all :/',
	'git rm -r --cached ../ansible/',
	"git commit -m \'" + today + "\'",
	'git push -f origin master',
	'git checkout -f dev'
]));

gulp.task('default', ['deploy-to-github']);
