define([
  "page", "router"
], function(page) {
  "use strict";
  var $body = $("body");

  $body.on("click", "a[data-href]", function(e) {
    var url = e.currentTarget.dataset.href,
      current = page.current;
    if (url !== current) {
      page(url);
    }
    e.preventDefault();
  });

  console.log("App godemo");
});