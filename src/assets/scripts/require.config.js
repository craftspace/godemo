(function() {
  "use strict";

  require.config({
    waitSeconds: 0,
    urlArgs: "r=@REV@",
    baseUrl: "/assets/scripts",
    restUrl: "/app/v1/", // server url prefix
    paths: {
      jquery: "../../bower_components/jquery/dist/jquery",
      bootstrap: "../../bower_components/bootstrap/dist/js/bootstrap",
      lodash: "../../bower_components/underscore/underscore",
      handlebars: "../../bower_components/handlebars/handlebars.runtime",
      moment: "../../bower_components/moment/moment",
      page: "../../bower_components/page/page",
      store: "../../bower_components/store2/dist/store2"
    },
    shim: {
      bootstrap: {
        deps: ["jquery"]
      }
    },
    callback: function() {
      require(["bootstrap"], function() {
        require(["../../app"]);
      });
    }
  });
}.call(this));