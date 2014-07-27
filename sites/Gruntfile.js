module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    path: 'all/themes/stevenrovery',

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed' //compressed or compact
        },
        files: {
          '<%= path %>/assets/css/styles.css' : '<%= path %>/assets/scss/styles.scss'
        }
      }
    },

    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [
          '<%= path %>/assets/src/**/*.js'
        ],
        dest: '<%= path %>/assets/js/concat/concat.js'
      },
      libs: {
        src: [
          '<%= path %>/vendor/**/angular.js',
          '<%= path %>/vendor/**/angular-animate.js',
          '<%= path %>/vendor/**/angular-route.js',
          '<%= path %>/vendor/**/angular-sanitize.js',
          '<%= path %>/vendor/**/showdown.js',
          '<%= path %>/vendor/**/markdown.js',
          '<%= path %>/vendor/**/underscore.js',
        ],
        dest: '<%= path %>/assets/js/concat/concat-libs.js'
      }
    },

    uglify: {
      script: {
        files: {
          '<%= path %>/assets/js/min/script.min.js' : '<%= path %>/assets/js/concat/concat.js'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['<%= path %>/assets/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['<%= path %>/assets/src/**/*.js'],
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
  grunt.registerTask('build', ['sass', 'uglify']);
};