module.exports = function () {
  'use strict';
  return {
    'default' : ['jshint:dev', 'compass:dev', 'express:dev', 'watch'],
    'test' : ['jshint:dev', 'karma:unit'],
    'dist' : ['jshint:test', 'jshint:dev', 'karma:unit', 'jshint:prod', 'githooks:dev'],
    'server' : ['express:dev', 'watch']
  };
};
