var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');

// Gulp Sass Task
gulp.task('sass', function() {
    gulp.src('public/styles/scss/styles.scss')
        .pipe(sass({noCache: true}))
        .pipe(gulp.dest('public/styles'));
});


gulp.task('build', function() {
    var b = browserify({
        entries: 'public/scripts/app.js',
        debug: true
    });

    return b.transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});