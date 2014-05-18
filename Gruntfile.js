module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {},
    jshint: {},
    concat: {
      dist: {
        src: ['src/shema.js'],
        dest: 'build/eloquent.js',
      }
    },
    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      dist: {
        files: {
          'build/eloquent.min.js': ['src/schema.js'],
        }
      }
    }
  });

  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('release', ['jshint', 'concat', 'uglify', 'zip']);
};
