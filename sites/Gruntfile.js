module.exports = function(grunt) {
  var $path = 'all/themes/stevenrovery';
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed' //compressed or compact
        },
        files: {
          $path + '/assets/css/styles.css' : $path + '/assets/scss/styles.scss'
        }
      }
    },

    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [
          $path + '/assets/js/**/*.js'
        ],
        dest: $path + '/assets/js/concat/concat.js'
      }
    },

    uglify: {
      script: {
        files: {
          $path + '/assets/js/min/script.min.js' : $path + '/assets/js/concat.js'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: [ $path + '/assets/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      js: {
        files: [$path + '/assets/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      }
    },


  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('docs', ['docular', 'docular-server']);
  grunt.registerTask('build', ['sass', 'uglify']);
};