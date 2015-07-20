module.exports = {
  jshintrc : 'true',
  dev : {
    files : {
      src : ['Gruntfile.js', '!karma.conf.js', 'test/**/*.js', '!test/angular-mocks.js', 'lib/*/*.js']
    },
    options : {
      jshintrc : 'config/.jshintrc',
      reporter: require('jshint-stylish')
    }
  },
  test : {
    files : {
      src : ['test/**/*.js']
    },
    options : {
      jshintrc : 'config/.jshintrc',
      ignores : ['test/angular-mocks.js', 'test/test-helper.js']

    }
  }
};