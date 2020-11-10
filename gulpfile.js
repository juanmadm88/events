const gulp = require('gulp');
const clean = require('gulp-clean');
const plumber = require("gulp-plumber");
const terser = require('gulp-terser');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');

const config = require('./gulp/config');
const tsProject = ts.createProject('tsconfig.json');

// Task to delete source directory
gulp.task(config.clean.name, () => {
	return gulp.src(config.clean.src, {allowEmpty: true, read: false})
        .pipe(plumber())
        .pipe(clean());
});

// Task that will be executed when changes are detected
gulp.task('compile', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(config.server.tmp));
});

gulp.task('compress', () => {
	return gulp.src(config.server.jsSrc)
        .pipe(terser())
        .pipe(gulp.dest(config.server.dest))
});

gulp.task('clean:temporal', () => {
	return gulp.src(config.server.tmp, {allowEmpty: true, read: false})
		.pipe(plumber())
		.pipe(clean());
});

gulp.task('init-dev', () => {
	let stream = nodemon({
		exec: 'node --inspect=9228',
		script: config.server.src,
		ext: 'js',
		env: {
			'NODE_ENV': 'development',
			'location': 'localhost',
			'host': 'localhost',
			'database': 'challenge-events',
			'port': '27017'
		}
	});

	stream.on('crash', function(){
		console.error('Application has crashed!\n');
		stream.emit('restart', 10);  // restart the server in 10 seconds
	})
});

gulp.task('build', gulp.series('compile', 'compress', 'clean:temporal'), () => {
    console.console.log('App build!');
});

gulp.task('compile-dev', () => {
	const tsResult = tsProject.src().pipe(tsProject());
	return tsResult.js.pipe(gulp.dest(config.server.dest));
 });

 gulp.task('build-dev', gulp.series('compile-dev', 'clean:temporal'), () => {
	console.console.log('App build!');
 });

gulp.task('default', gulp.series(config.clean.name, 'build'));
gulp.task('start-dev', gulp.series(config.clean.name, 'build-dev', 'init-dev'));
