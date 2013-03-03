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

        var cOpen   = this.data.block.open || 'devcode';
        var cClose  = this.data.block.close || 'endcode';
        var workDir = path.resolve(process.cwd(), context.DEST || this.data.dest);
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
                file = path.resolve(workDir,file);
                var body = grunt.file.read(file);

                var regex = new RegExp(startblock + '[\\s\\S]*?' + endblock + '[\\s\\r\\n]?', 'g');

                // replace code according to current environment
                body = body.replace(regex, function($0, $1)
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

                if ( _this.data.clean == true ) // remove devcode tags
                {
                    body = body.replace(new RegExp(startblock + '\\n?$', 'gm'), '');
                    body = body.replace(new RegExp(endblock   + '\\n?$', 'gm'), '');
                }

                grunt.file.write(file, body);
            });
        };

        // { html: true, js: true, css: true }
        if ( this.data.html == true )
        {
            replaceCode(grunt.file.expand({cwd: workDir},'**/*.html'), 'html');
        }
        if ( this.data.js == true )
        {
            replaceCode(grunt.file.expand({cwd: workDir},'**/*.js'), 'js');
        }
        if ( this.data.css == true )
        {
            replaceCode(grunt.file.expand({cwd: workDir},'**/*.css'), 'css');
        }
    });
};
