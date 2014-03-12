module.exports = function(grunt) {

  grunt.initConfig({
    karma: {
      plugins: [ 'karma-osx-reporter' ],
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true,
        singleRun: false
      }
    },
    concat: {
      dist: {
        src: [
          'bower_components/lodash/dist/lodash.min.js',
          'bower_components/ypromise/promise.js',
          'bower_components/uxhr/uxhr.min.js',
          'src/eloquent/eloquent.js'
        ],
        dest: 'dist/active-record.js'
      }
    },
    ngmin: {
      dist: {
        src: ['dist/active-record.js'],
        dest: 'dist/active-record.js'
      }
    },
    uglify: {
      dist: {
        src: 'dist/active-record.js',
        dest: 'dist/active-record.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['concat:dist', 'ngmin:dist', 'uglify:dist']);
  grunt.registerTask('test', ['karma:unit']);

};
