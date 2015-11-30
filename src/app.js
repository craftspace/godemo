define([
  "page", "router"
], function(page) {
  "use strict";
  var $body = $("body");

  var initEvents = function() {
    $body.on("click", "a[data-href]", function(e) {
      var url = e.currentTarget.dataset.href,
        current = page.current;
      if (url !== current) {
        page(url);
      }
      e.preventDefault();
    });
  };

  var init = function() {
    initEvents();
  };

  init();
});