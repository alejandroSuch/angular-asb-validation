// Gruntfile.js
module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            all: ['src/**/*.js']
        },

        clean: {
            lib: {
                src: ['lib/**/*.js']
            }
        }
    });
}