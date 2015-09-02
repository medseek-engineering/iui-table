var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var minjs = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var compass = require('gulp-compass');
var rename = require('gulp-rename');
var ngHtml2Js = require('gulp-ng-html2js');
var karma = require('karma').server;
var jshint = require('gulp-jshint');
var express = require('express');
var browserSync = require('browser-sync').create();
var hologram = require('gulp-hologram');

// Defining Files
var base = './lib/src/';
var destination = './lib/dist';
var templateFiles = ['./lib/src/**/*.html', './lib/src/**/*.svg'];
var templateFile = 'iui-table-templates.js';
var jsFilesCombined = [
  './lib/src/iui-table-module-header.js',
  './lib/src/**/*.js'
];
var additionalLintFiles = [
  './lib/dist/core-module-setup.js',
  './test/**/*.test.js',
  './gulpfile.js'
];

var watchFiles = {
  styles: ['lib/src/**/*.scss','lib/src/*.scss','doc_assets/stylesheets/*.scss'],
  demo: ['index.html','demo-files/*.js', 'style-guide/*.html'],
  srcFiles: ['lib/src/**/*.html', 'lib/src/**/*.js']
};

gulp.task('lint', function () {
  'use strict';
  var lintFiles = jsFilesCombined.concat(additionalLintFiles);
  return gulp.src(lintFiles, {base: base})
    .pipe(jshint('./node_modules/iui-general/config/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('test', ['lint'], function (done) {
  'use strict';
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});


gulp.task('createTemplates', function(cb){
  'use strict';
  gulp.src(templateFiles)
    .pipe(ngHtml2Js({
      base: base,
      moduleName: 'iui.tableTemplates',
      prefix: '/$iui-table/'
    }))
    .pipe(gulpConcat(templateFile))
    .pipe(gulp.dest(destination))
    .on('end', cb);
});

gulp.task('combineFiles', ['createTemplates'], function(){
  'use strict';
  // combine and minify JS
  var templateWithDestination = destination+'/'+templateFile;
  jsFilesCombined.push(templateWithDestination);
  jsFilesCombined.push('!./lib/src/**/*.test.js');
  gulp.src(jsFilesCombined, {base: base})
    .pipe(gulpConcat('iui-table.js'))
    .pipe(gulp.dest(destination))
    .pipe(rename('iui-table.min.js'))
    .pipe(minjs({mangle: false}))
    .pipe(gulp.dest(destination))
    .pipe(browserSync.stream());
});

gulp.task('compileStyle', function(){
  'use strict';
  gulp.src(base+'*.scss')
    .pipe(compass({
      /* jshint ignore:start */
      config_file: './config.rb',
      /* jshint ignore:end */ 
      sass: 'lib/src',
      css: 'lib/dist'
    }))
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(destination))
    .pipe(browserSync.stream());
});

gulp.task('hologram', function() {
  'use strict';
  gulp.src('hologram_config.yml')
    .pipe(hologram());
  browserSync.reload();
});

gulp.task('serve', ['compileStyle'], function() {
  'use strict';
  browserSync.init({
      server: {
          baseDir: './'
      }
  });
  gulp.watch(watchFiles.styles, ['compileStyle', 'hologram']);
  gulp.watch(watchFiles.srcFiles, ['createTemplates', 'combineFiles', 'hologram']);
  gulp.watch(watchFiles.demo).on('change', browserSync.reload);
});

gulp.task('default', ['lint', 'test', 'compileStyle', 'createTemplates', 'combineFiles']);