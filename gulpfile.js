// Generated on 2016-03-01 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
// var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var proxy = require('http-proxy-middleware');

var yeoman = {
  app: require('./bower.json').appPath || 'zh',
  dist: ''
};

var paths = {
  scripts: [yeoman.app + '/js/**/*.js'],
  styles: [yeoman.app + '/scss/**/*.scss'],
  test: ['test/spec/**/*.js'],
  testRequire: [
    yeoman.app + '/bower_components/angular/angular.js',
    yeoman.app + '/bower_components/angular-mocks/angular-mocks.js',
    // yeoman.app + '/bower_components/angular-resource/angular-resource.js',
    // yeoman.app + '/bower_components/angular-cookies/angular-cookies.js',
    yeoman.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    // yeoman.app + '/bower_components/angular-route/angular-route.js',
    yeoman.app + '/bower_components/angular-ui-route/release/angular-ui-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: yeoman.app + '/index.html',
    files: ['html/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

// var styles = lazypipe()
//   .pipe($.sass, {
//     outputStyle: 'compressed',
//     precision: 10
//   })
//   .pipe($.autoprefixer, 'last 1 version')
//   .pipe(gulp.dest, '.tmp/styles');
  // .pipe(gulp.dest, 'zh/css/');

///////////
// Tasks //
///////////

// gulp.task('styles', function () {
//   return gulp.src(paths.styles)
//     .pipe(styles());
// });

// gulp.task('lint:scripts', function () {
//   return gulp.src(paths.scripts)
//     .pipe(lintScripts());
// });


// css任务
gulp.task('css', function () {
  return gulp.src('zh/scss/**/*.scss')
    .pipe($.sass({
      outputStyle: 'compressed',
      compass: true,
      precision: 10
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // .pipe($.concat('style.css'))
    .pipe(gulp.dest('css/'))
    .pipe($.connect.reload());
});


// js任务
gulp.task('jsModule', function() {
  return gulp.src('zh/js/modules/*.js')
    .pipe($.concat('modules.js'))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('js/common/'))
    .pipe($.connect.reload());
});
// gulp.task('jsControllers', function() {
//   return gulp.src('zh/js/controllers/*.js')
//     .pipe($.concat('controller_viwe.js'))
//     .pipe(gulp.dest('js/view'))
//     .pipe($.connect.reload());
// });
// gulp.task('jsDirectives', function() {
//   return gulp.src('zh/js/directives/*.js')
//     .pipe($.concat('controller_viwe.js'))
//     .pipe(gulp.dest('js/mode'))
//     .pipe($.connect.reload());
// });



gulp.task('server',function(){
    $.connect.server({
        root: './',
        port:3005,
        livereload:true,
        middleware:function(connect, opt){
           return [
              proxy(['/activity/', '/user/', '/support/', '/userDetail/','/sponsor/', '/activity_support/', '/eCoin/', '/bankAccount/', '/baitiao/'], {// configure proxy middleware
                    // context: '/', // will proxy all requests
                    // use: '/', //to proxy request when path starts with '/api'
                    target: 'http://localhost:8080', 
                    changeOrigin:true    // for vhosted sites, changes host header to match to target's host
                })
           ];
        }   
    });
});


gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'css'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  });
});

gulp.task('start:server:test', function() {
  $.connect.server({
    root: ['test', yeoman.app, '.tmp'],
    livereload: true,
    port: 9001
  });
});

gulp.task('watch', function () {

  // $.watch(paths.styles)
  //   .pipe($.plumber())
  //   .pipe(styles())
  //   .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  // $.watch(paths.scripts)
  //   .pipe($.plumber())
  //   .pipe(lintScripts())
  //   .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts());

  var files = [
    'html/**/*.html',
    'css/**/*.css',
    'zh/images/**/*',
    'zh/js/**/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './',
      proxy: 'localhost:3005'
    }
  });

  // css监听
  gulp.watch('zh/scss/**/*.scss', ['css']);

  // js监听
  gulp.watch('zh/js/modules/*.js', ['jsModule']);
  // gulp.watch('zh/js/controllers/*.js', ['jsControllers']);
  // gulp.watch('zh/js/directives/*.js', ['jsDirectives']);


  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: yeoman.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest(yeoman.app + '/views'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('client:build', ['html', 'css'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(paths.views.main)
    .pipe($.useref({searchPath: [yeoman.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    // .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest('/build'));
});

gulp.task('html', function () {
  return gulp.src(yeoman.app + '/html/**/*')
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('images', function () {
  return gulp.src(yeoman.app + '/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src(yeoman.app + '/*/.*', { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function () {
  return gulp.src(yeoman.app + '/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['images', 'copy:extras', 'copy:fonts', 'client:build']);
});

gulp.task('default', ['watch', 'server']);
gulp.task('bundle', ['build']);