module.exports = function () {
  'use strict';
  return {
    'default' : ['jshint:dev', 'express:dev', 'watch'],
    'test' : ['jshint:dev', 'karma:unit'],
    'pack': ['html2js:dist', 'concat:dist'],
    'dist' : ['jshint:test', 'jshint:dev', 'karma:unit', 'jshint:prod', 'githooks:dev'],
    'server' : ['express:dev', 'watch']
  };
};
