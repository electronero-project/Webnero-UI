var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

// Compile LESS files from /less into /css
gulp.task('less', function(done) {
    gulp.src('less/etnx.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
    gulp.src('less/light.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
    gulp.src('less/spinner.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
    gulp.src('less/slider_button.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
    done();
});

// Minify compiled CSS
gulp.task('minify-css', gulp.series('less', function(done) {
    gulp.src('dist/css/etnx.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
    gulp.src('dist/css/spinner.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
    done();
}));

// Copy JS to dist
gulp.task('js', function(done) {
    gulp.src(['js/etnx.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/utils.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/qr-gen.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/locals.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/crypto.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/index.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/login.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/login-utils.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/register.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/pin-code-utils.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/history.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/send.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/passport.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/settings.js']).pipe(gulp.dest('dist/js'));

    done();
})

// Copy plugins libraries from /bower_components into /plugins
gulp.task('copy', function(done) {
    gulp.src(['bower_components/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('plugins/bootstrap'))

    gulp.src(['bower_components/bootstrap-social/*.css', 'bower_components/bootstrap-social/*.less', 'bower_components/bootstrap-social/*.scss'])
        .pipe(gulp.dest('plugins/bootstrap-social'))

    gulp.src(['bower_components/datatables/media/**/*'])
        .pipe(gulp.dest('plugins/datatables'))

    gulp.src(['bower_components/datatables-plugins/integration/bootstrap/3/*'])
        .pipe(gulp.dest('plugins/datatables-plugins'))

    gulp.src(['bower_components/datatables-responsive/css/*', 'bower_components/datatables-responsive/js/*'])
        .pipe(gulp.dest('plugins/datatables-responsive'))

    gulp.src(['bower_components/flot/*.js'])
        .pipe(gulp.dest('plugins/flot'))

    gulp.src(['bower_components/flot.tooltip/js/*.js'])
        .pipe(gulp.dest('plugins/flot-tooltip'))

    gulp.src(['bower_components/font-awesome/**/*', '!bower_components/font-awesome/*.json', '!bower_components/font-awesome/.*'])
        .pipe(gulp.dest('plugins/font-awesome'))

    gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('plugins/jquery'))

    gulp.src(['bower_components/metisMenu/dist/*'])
        .pipe(gulp.dest('plugins/metisMenu'))

    gulp.src(['bower_components/morrisjs/*.js', 'bower_components/morrisjs/*.css', '!bower_components/morrisjs/Gruntfile.js'])
        .pipe(gulp.dest('plugins/morrisjs'))

    gulp.src(['bower_components/raphael/raphael.js', 'bower_components/raphael/raphael.min.js'])
        .pipe(gulp.dest('plugins/raphael'))

    gulp.src(['bower_components/qrious/dist/qrious.js', 'bower_components/qrious/dist/qrious.min.js'])
        .pipe(gulp.dest('plugins/qrious'))

        done();

})


// Configure the browserSync task
gulp.task('browserSync', function(done) {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
    done();
})

gulp.task('njk', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('app/pages/**/*.+(html|njk)')
    // Adding data to Nunjucks
    .pipe(data(function() {
        return require('./app/data.json')
      }))
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['app/templates']
      }))
    // output files in app folder
    .pipe(gulp.dest('wallet'))
  });
  
// Run everything
gulp.task('deploy', gulp.series('less', 'minify-css', 'js', 'copy','njk', function(done){
	done();
}));

// Dev task with browserSync
gulp.task('dev', gulp.series('browserSync', 'less', 'minify-css', 'js', function(done) {
    gulp.watch('less/*.less', gulp.series('less'));
    gulp.watch('dist/css/*.css', gulp.series('minify-css'));
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('pages/*.html', gulp.series(reload));
    gulp.watch('dist/js/*.js', gulp.series(reload));
    done();
}));



