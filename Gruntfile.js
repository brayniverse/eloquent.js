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
          'src/**/*.js'
        ],
        dest: 'dist/eloquent.js'
      }
    },
    ngmin: {
      dist: {
        src: ['dist/eloquent.js'],
        dest: 'dist/eloquent.js'
      }
    },
    uglify: {
      dist: {
        src: 'dist/eloquent.js',
        dest: 'dist/eloquent.min.js'
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
