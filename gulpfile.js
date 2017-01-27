
gulp = require('gulp');
scss = require('gulp-scss');
sass = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
cleanCSS = require('gulp-clean-css');
rename = require('gulp-rename');
browserSync = require('browser-sync');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
gutil          = require('gulp-util' );
ftp            = require('vinyl-ftp');

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "lightdiods",
        notify: false
    });
});



gulp.task('styles', function () {
	return gulp.src('scss/**/*.scss')
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer({browsers: ['last 5 versions'], cascade: false}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('templates/lightdiods/css'))
		.pipe(browserSync.stream());
});





gulp.task('watch', function () {
	gulp.watch('scss/**/*.scss', ['styles']);

	gulp.watch('templates/lightdiods/js/*.js').on("change", browserSync.reload);


});


// Выгрузка изменений на хостинг
gulp.task('deploy', function() {
    var conn = ftp.create({
        host:      'betsy.timeweb.ru',
        user:      'avr1972',
        password:  'levkinpavel1',
        parallel:  1,
        log: gutil.log
    });
    var globs = [
        'templates/lightdiods/**'


    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/lightdiods.ru/public_html/templates/lightdiods/'));
});


gulp.task('jshdeploy', function() {
    var conn = ftp.create({
        host:      'betsy.timeweb.ru',
        user:      'avr1972',
        password:  'levkinpavel1',
        parallel:  10,
        log: gutil.log
    });
    var globs = [
        'components/com_jshopping/templates/default_div/**'


    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/lightdiods.ru/public_html/components/com_jshopping/templates/default_div/'));
});








gulp.task('default', ['browser-sync', 'styles', 'watch']);


