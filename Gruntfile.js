module.exports = function(grunt) {
  "use strict";
  var serveStatic = require("serve-static");
  var rewrite = require('connect-modrewrite');

  grunt.initConfig({
    port: 5601,
    liveReloadPort: 35729,
    srcDir: "src",
    tempDir: "temp",
    templateDir: "<%=tempDir%>/assets/templates",
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

    // Clean the project
    clean: {
      temp: ["<%=tempDir%>"]
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: ["copy:src"]
    },

    // Copy files
    copy: {
      src: {
        cwd: "<%=srcDir%>",
        expand: true,
        src: ["**/*", "!assets/**/*.{less,css}", "!*/*.hbs"],
        dest: "<%=tempDir%>"
      },
      js: {
        cwd: "<%=srcDir%>",
        expand: true,
        src: ["app.js", "assets/**/*.js"],
        dest: "<%=tempDir%>"
      },
      html: {
        cwd: "<%=srcDir%>",
        expand: true,
        src: ["**/*.html"],
        dest: "<%=tempDir%>"
      }
    },

    // Compile less
    less: {
      compile: {
        files: {
          "<%=tempDir%>/assets/styles/all.css": "<%=srcDir%>/assets/styles/**/*.less"
          //expand: true,
          //cwd: "<%=srcDir%>/assets/styles/",
          //src: ["**/*.less"],
          //dest: "<%=tempDir%>/assets/styles/",
          //ext: ".css",
          //extDot: "last"
        }
      },
      compress: {
        options: {
          compress: true
        },
        files: "<%=tempDir%>/assets/styles/all.css"
      }
    },

    // Concat definitions
    concat: {
      js: {
        options: {
          banner: "<%=meta.banner%>"
        },
        files: {
          "<%=tempDir%>/*.js": ["<%=tempDir%>/assets/scripts/**/*.js", "<%=tempDir%>/app.js"]
        }
      },
      css: {
        options: {
          banner: "<%=meta.banner%>",
          separator: ""
        },
        files: {
          "<%=tempDir%>/assets/styles/all.css": [
            "<%=tempDir%>/assets/styles/all.css",
            "<%=srcDir%>/assets/styles/vendor/*.css",
            "<%=srcDir%>/bower_components/select2/dist/css/select2.css"
          ]
        }
      }
    },

    // Lint definitions
    jshint: {
      files: [
        "Gruntfile.js",
        "<%=srcDir%>/app.js",
        "<%=srcDir%>/assets/**/*.js"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Minify definitions
    uglify: {
      js: {
        options: {
          banner: "<%=meta.banner%>",
          compress: true
        },
        files: {
          "<%=tempDir%>/app.js": "<%=tempDir%>/app.js"
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
          "<%=tempDir%>/assets/styles/all.css": "<%=tempDir%>/assets/styles/all.css"
        }
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: false,
          amd: true,
          processContent: function(content) {
            content = content.replace(/^[\x20\t]+/mg, "").replace(/[\x20\t]+$/mg, "");
            content = content.replace(/^[\r\n]+/, "").replace(/[\r\n]+$/, "");
            return content;
          }
        },
        files: {
          // TODO any other choices?
          "<%=templateDir%>/layout/user.js": ["<%=srcDir%>/assets/templates/layout/user.hbs"],
          "<%=templateDir%>/layout/tag.js": ["<%=srcDir%>/assets/templates/layout/tag.hbs"],
          "<%=templateDir%>/layout/search-result.js": ["<%=srcDir%>/assets/templates/layout/search-result.hbs"]
        }
      }
    },

    // Watch for changes to source
    // Better than calling grunt a million times
    watch: {
      js: {
        files: ["<%=srcDir%>/**/*.js"],
        tasks: ["jshint", "copy:js"]
      },
      css: {
        files: ["<%=srcDir%>/**/*.{less,css}"],
        tasks: ["less", "concat:css"]
      },
      html: {
        files: ["<%=srcDir%>/**/*.html"],
        tasks: ["copy:html"]
      },
      hbs: {
        files: ["<%=srcDir%>/assets/templates/**/*.hbs"],
        tasks: ["handlebars"]
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ["build"]
      },
      options: {
        livereload: "<%=liveReloadPort%>"
      }
    },

    // Open the browser
    open: {
      server: {
        path: "http://localhost:<%=port%>/"
      }
    },

    // Start server
    connect: {
      dev: {
        options: {
          port: "<%=port%>",
          base: ["<%=tempDir%>"],
          //debug: true,
          livereload: true,
          middleware: function(connect, options) {
            return [
              rewrite([
                "^/app/v1/(.*)$ http://127.0.0.1:8000/app/v1/$1 [P]",
                //"^/favicon.ico$ /favicon.ico",
                "!\\.html|/api|\\.js|\\.svg|" +
                "\\.css|\\.png|\\.jpg|\\.gif|" +
                "\\.ico|\\.woff|\\.eot|\\.ttf|\\.md$ /index.html [L]"
              ]),
              serveStatic(options.base[0]),
              connect().use(require('serve-favicon')(options.base[0] + "/favicon.ico")) // Seems not work?
            ];
          }
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-open");

  grunt.registerTask("build", ["jshint", "clean", "concurrent:server", "less", "concat:css", "handlebars"]);
  grunt.registerTask("default", ["build", "connect:dev", "open", "watch"]);
  grunt.registerTask("release", ["build", "uglify:js", "concat:js", "cssmin", "connect:dev", "open", "watch"]);
  grunt.registerTask("distribute", ["build", "uglify:js", "concat:js", "cssmin"]);
  //grunt.registerTask("travis", ["build"]);
  grunt.registerTask("serve", ["default"]);

};
