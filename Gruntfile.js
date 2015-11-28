module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    port: 5601,
    liveReloadPort: 35729,
    // Import package manifest
    pkg: grunt.file.readJSON("package.json"),

    // Banner definitions
    meta: {
      banner: "/*\n" +
      " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
      " *  <%= pkg.description %>\n" +
      " *  <%= pkg.homepage %>\n" +
      " *\n" +
      " *  Made by <%= pkg.author.name %>\n" +
      " *  Under <%= pkg.license %> License\n" +
      " */\n"
    },

    // Compile less
    less: {
      compile: {
        files: {
          "src/assets/styles/all.css": "src/assets/styles/**/*.less"
        }
      },
      compress: {
        options: {
          compress: true
        },
        files: "src/assets/styles/all.css"
      }
    },

    // Concat definitions
    concat: {
      js: {
        options: {
          banner: "<%= meta.banner %>"
        },
        files: {
          src: ["src/app/*.js"],
          dest: "dist/app.js"
        }
      },
      css: {
        options: {
          banner: "<%= meta.banner %>",
          separator: ""
        },
        files: {
          "src/assets/styles/all.css": ["src/assets/styles/all.css", "src/assets/styles/vendor/*.css"]
        }
      }
    },

    // Lint definitions
    jshint: {
      files: [
        "Gruntfile.js",
        "src/assets/**/*.js"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Minify definitions
    uglify: {
      js: {
        options: {
          banner: "<%= meta.banner %>"
        },
        files: {
          "dist/app.js": ["src/assets/scripts/**/*.js"]
        }
      }
    },

    // Minify css files
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      compress: {
        files: {
          "src/assets/styles/all.css": "src/assets/styles/all.css"
        }
      }
    },

    // watch for changes to source
    // Better than calling grunt a million times
    watch: {
      js: {
        files: ["src/**/*.js"],
        tasks: ["jshint"]
      },
      css: {
        files: ["src/**/*.{less,css}"],
        tasks: ["less", "concat:css"]
      },
      options: {
        livereload: "<%=liveReloadPort%>"
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%=port%>/'
      }
    },

    connect: {
      dev: {
        options: {
          port: "<%=port%>",
          livereload: true,
          middleware: function() {
            return [
              require('serve-static')("src"),
              require("connect-livereload")({port: "<%=liveReloadPort%>"})
            ];
          }
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-open");

  grunt.registerTask("build", ["less", "concat:css", "uglify", "cssmin"/*, "uglify:js"*/]);
  grunt.registerTask("default", ["jshint", "build", "connect:dev", "open", "watch"]);
  grunt.registerTask("travis", ["default"]);

};
