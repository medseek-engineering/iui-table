module.exports = function (grunt) {
  //@fmt:off
  'use strict';
  //@fmt:on


  require('load-grunt-config')(grunt);
  require('load-grunt-tasks')(grunt);

  // on watch events configure jshint:all to only run on changed file
  grunt.event.on('watch', function (action, filepath) {
    grunt.config(['jshint', 'dev'], filepath);
  });
  grunt.registerTask('forceOn', 'turns the --force option ON', function () {
    if (!grunt.option('force')) {
      grunt.config.set('forceStatus', true);
      grunt.option('force', true);
    }
  });

  grunt.registerTask('forceOff', 'turns the --force option Off', function () {
    if (grunt.config.get('forceStatus')) {
      grunt.option('force', false);
    }
  });

};