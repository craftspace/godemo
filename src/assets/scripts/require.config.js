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
      text: "../../bower_components/requirejs-text/text"
    },
    shim: {
      jquery: {
        exports: "jQuery"
      },
      bootstrap: {
        deps: ["jquery"]
      }
    },
    callback: function() {
      require(["bootstrap", function() {
        require("../../app");
      }]);
    }
  });
}.call(this));