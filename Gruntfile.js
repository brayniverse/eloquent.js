module.exports = function( grunt ) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON( 'package.json' ),
    
    watch: {},
    
    jshint: {},
    
    concat: {
      dist: {
        src: [ 'src/shema.js' ],
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
          'build/eloquent.min.js': [ 'src/schema.js' ],
        }
      }
    }
  });

  require( 'load-grunt-tasks' )( grunt );

  // Default Task
  // Used during development, this task will watch for file changes and generate a new `build` file.
  grunt.registerTask( 'default', [ 'watch', 'concat', 'uglify' ] );
  
  // Deploy Task
  // This will build 
  grunt.registerTask( 'deploy', [ 'jshint', 'concat', 'uglify', 'zip' ] );

};
