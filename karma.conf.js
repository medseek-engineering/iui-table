module.exports = function (config) {
  'use strict';
  config.set({
    basePath: '',

    port: 9267,

    runnerPort: 9100,

    colors: true,

    autoWatch: true,

    logLevel: config.LOG_INFO,

    customLaunchers: {
      TinyChrome: {
        base: 'Chrome',
        flags: ['--window-size=0,0']
      }
    },

    //Firefox currently working on build servers - don't change in repo!
    browsers: ['Firefox'],

    captureTimeout: 60000,

    browserDisconnectTolerance: 0,

    browserNoActivityTimeout: 60000,

    singleRun: true,

    plugins: [
      'karma-jasmine',
      //'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-coverage',
      'karma-ng-html2js-preprocessor',
      'karma-spec-reporter'
    ],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    htmlReporter: {
      outputDir: 'karma_html',
      templatePath: __dirname + '/node_modules/karma-html-reporter/jasmine_template.html'
    },

    files: [
      // app core dependencies
      'test/test-helper.js',
      'node_modules/ui-core/lib/content/js/angular.js',
      'node_modules/ui-core/lib/content/js/main.js',
      'test/angular-mocks.js',

      // app module dependencies
      'lib/directives/*.js',
      'lib/services/*.js',
      'lib/filters/*.js',

      //directive templates
      'lib/**/*.html',
      // test scripts
      'test/**/*.test.js'
    ],

    reporters: ['coverage', 'progress', 'html'],

    preprocessors: {
      'lib/**/*.html': ['ng-html2js'],
      'lib/directives/*.js': ['coverage'],
      'lib/filters/*.js': ['coverage'],
      'lib/services/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      // immitates ui-core
      prependPrefix: '/$iui-table',
      stripPrefix: 'lib',
      moduleName: 'templates'
    },

    frameworks: ['jasmine']
  });
};