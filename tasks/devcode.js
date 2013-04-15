/*
 * devcode
 * https://github.com/livedata/grunt-devcode
 *
 * Written by Krzysztof Antczak
 * Licensed under the Apache 2.0 license.
 */
/*jshint node:true*/

'use strict';

module.exports = init;

var grunt = require('grunt'),
    path = require('path');

var _ = grunt.util._;
var defaultEnv = {};

function init(grunt)
{
    grunt.registerMultiTask('devcode', 'Remove code blocks based on environment configuration', function()
    {
        var context = _.extend({},defaultEnv,process.env), files;
        context.NODE_ENV = context.NODE_ENV || 'development';

        var options = this.options();
        context.NODE_ENV = options.env || context.NODE_ENV;

        var cOpen   = options.block.open || 'devcode';
        var cClose  = options.block.close || 'endcode';
        var srcDir = path.resolve(process.cwd(), options.source);
        var dstDir = path.resolve(process.cwd(), options.dest);
        var _this   = this;

        var replaceCode = function ( files, type )
        {
            if ( type == 'html' || typeof type == 'undefined' )
            {
                var startblock = '<!--\\s*'+cOpen+':\\s*([^-]+)-->';
                var endblock   = '<!--\\s*'+cClose+'\\s*-->';
            }
            else if ( type == 'js' || type == 'css' )
            {
                var startblock = '\/\/\\s*'+cOpen+':\\s*?([^\\n]+)';
                var endblock   = '\/\/\\s*'+cClose+'\\s*';
            }

            files.forEach(function(file)
            {
                var sfile = path.resolve(srcDir,file);
                var tfile = path.resolve(dstDir,file);
                var obody = grunt.file.read(sfile);

                var regex = new RegExp(startblock + '[\\s\\S]*?' + endblock + '[\\s\\r\\n]?', 'g');

                // replace code according to current environment
                var body = obody.replace(regex, function($0, $1)
                {
                    var m = $1.replace(/^\s+|\s+$/g, ''); // trim

                    if ( m.indexOf('!') == -1 )
                    {
                        if ( context.NODE_ENV != m ) return ''; else return $0;
                    }
                    else
                    {
                        if (  '!'+context.NODE_ENV == m ) return ''; else return $0;
                    }
                });

                if ( options.clean == true ) // remove devcode tags
                {
                    body = body.replace(new RegExp('^.*'+startblock + '\\n?', 'gm'), '');
                    body = body.replace(new RegExp(endblock   + '\\n?', 'gm'), '');
                }

                if ( obody != body )
                {
                    console.log ( 'Writing ', tfile );

                    grunt.file.write(tfile, body);
                }
            });
        };

        // { html: true, js: true, css: true }
        if ( options.html == true )
        {
            replaceCode(grunt.file.expand({cwd: srcDir, filter : "isFile"},'**/*.html'), 'html');
        }
        if ( options.js == true )
        {
            replaceCode(grunt.file.expand({cwd: srcDir, filter : "isFile"},'**/*.js'), 'js');
        }
        if ( options.css == true )
        {
            replaceCode(grunt.file.expand({cwd: srcDir, filter : "isFile"},'**/*.css'), 'css');
        }
    });
};
