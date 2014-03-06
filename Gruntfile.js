module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    concat: {
      dist: {
        src: [ 'src/XMLHttpRequest.js', 'src/request.js' ],
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

  grunt.registerTask('build', ['concat:dist', 'ngmin:dist', 'uglify:dist']);
};
