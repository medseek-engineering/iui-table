module.exports = {
  options : {
    livereload : true
  },
  scripts : {
    files : ['<%= jshint.dev.files.src %>'],
    tasks : ['jshint:dev']
  },
  tests : {
    files : ['<%= jshint.test.files.src %>'],
    tasks : ['jshint:test', 'karma']
  },
  express : {
    files : ['**/*.js'],
    tasks : ['express:dev'],
    options : {
      spawn : false // Without this option specified express won't be
      // reloaded
    }
  }
};