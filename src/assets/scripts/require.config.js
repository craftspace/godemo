(function() {
  "use strict";

  require.config({
    waitSeconds: 0,
    baseUrl: "assets/scripts",
    urlArgs: "r=@REV@",
    paths: {
      moment: "../../bower_components/moment/moment",
      lodash: "../../bower_components/underscore/underscore",
      bootstrap: "../../bower_components/bootstrap/dist/js/bootstrap",
      jquery: "../../bower_components/jquery/dist/jquery",
      handlebars: "../../bower_components/handlebars/handlebars.runtime",
      //template: "../../templates/all",
      text: "../../bower_components/requirejs-text/text"
    },
    shim: {
      jquery: {
        exports: "jQuery"
      },
      bootstrap: {
        deps: ["jquery"]
      //},
      //template: {
      //  deps: ["handlebars"]
      }
    },
    callback: function() {
      require(["bootstrap"], function() {
        require(["../../app"]);
      });
    }
  });
}.call(this));