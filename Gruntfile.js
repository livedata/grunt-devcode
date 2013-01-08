'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/**/*_test.js']
    },
    lint: {
      files: ['Gruntfile.js', 'tasks/**/*.js', '<config:test.files>']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    devcode : {
      files : {
        html: true,
        js: true,
        css: true,
        clean: true,
        block: {
          open: 'devcode',
          close: 'endcode'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'test');

};
