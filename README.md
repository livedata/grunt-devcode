# Devcode v.0.0.4 [![Dependency Status](https://david-dm.org/livedata/grunt-devcode.png)](https://david-dm.org/livedata/grunt-devcode)

Changelog:
v.0.0.4 - removed grunt-env dependency, changed configuration, devcode now supports 'grunt server'
v.0.0.3 - upgraded grunt dependency

# Usage with Yeoman grunt file:

Devcode is  a fork of grunt-preprocess project, which has been re-written from scratch at the end. Due to the problems I had with that library, along with an excessive amount of code (additional dependency from "preprocess") and I suppose not fully tested functionality.

Installation:
```
  npm install grunt-devcode
```

Loading devcode into grunt
```
  grunt.loadNpmTasks('grunt-devcode');
```

Little watch task (livereload section) change:
```
  livereload: {
    files: [
      '<%= yeoman.app %>/{,*/}*.html',
      '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
      '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
      '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg}'
    ],
    tasks: ['devcode:server','livereload']
  }
```
We have added a 'devcode' task with 'server' environment. It is important to add this one before 'livereload'.

Server task configuration
```
  grunt.registerTask('server', [
    'clean:server',
    'devcode:server', // devcode before coffee or whatever You like, but using 'server' section.
    'coffee:dist',
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);
```

Build task configuration
```
  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'coffee',
    'compass:dist',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'devcode:dist', // devcode after 'copy', or whatever You like if You know what are You doing.
    'cdnify',
    'usemin',
    'ngmin',
    'uglify'
  ]);
```

 Devcode configuration:
```
    devcode :
    {
      options :
      {
        html: true,        // html files parsing?
        js: true,          // javascript files parsing?
        css: true,         // css files parsing?
        clean: true,       // removes devcode comments even if code was not removed
        block: {
          open: 'devcode', // with this string we open a block of code
          close: 'endcode' // with this string we close a block of code
        },
        dest: 'dist'       // default destination which overwrittes environment variable
      },
      server : {           // settings for task used with 'devcode:server'
        options: {
            source: '<%= yeoman.app %>/',
            dest: '.tmp/',
            env: 'development'
        }
      },
      dist : {             // settings for task used with 'devcode:dist'
        options: {
            source: 'dist/',
            dest: 'dist/',
            env: 'production'
        }
      }
    },
```

Devcode usage (html files):
```
<!-- devcode: !production -->
  <li class="right"><a href="#settings" data-toggle="tab">Settings</a></li>
<!-- endcode -->

this code will show for all environment types but production
```

Devcode usage (js and css files):
```
// devcode: !production
  body {
    background-color: red;
  }
// endcode

this code will show for all environment types but production
```

Test server
```
  grunt server
```

Test build
```
  grunt build
```

## Todo
```
- Tests
```
