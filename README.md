# Usage with Yeoman grunt file:

Devcode is  a fork of grunt-preprocess project, which has been re-written from scratch at the end. Due to the problems I had with that library, along with an excessive amount of code (additional dependency from "preprocess") and I suppose not fully tested functionality.

Currently, I am not interested in  using 'devcode' with standalone grunt, therefore I focused on using it paired up with yeoman. However, if you have any additional suggestions regarding configuration, or the code itself, feel free to comment/send pull requests.


Installation:
```
  npm install grunt-devcode
```

Loading devcode into grunt
```
  grunt.loadNpmTasks('grunt-devcode');
```

Build task configuration:
```
  grunt.renameTask('build', 'original-build');
  grunt.registerTask('build', 'original-build devcode');
```

 Devcode configuration:
```
  devcode :
  {
    files :
    {
      html: true,        // html files parsing?
      js: true,          // javascript files parsing?
      css: true,         // css files parsing?
      clean: true,       // removes devcode comments even if code was not removed
      block: {
        open: 'devcode', // with this string we open a block of code
        close: 'endcode' // with this string we close a block of code
      }
    }
  }
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

Test:
```
  yeoman build
```

## Todo
```
- I was unable to find a way to use devcode with a yeoman server task. I will be happy to accept a pull request, if someone figures it out ;-)
- Little code and config files improvements
- Tests
```
