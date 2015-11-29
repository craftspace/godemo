define([
  "page", "link-list", "link-list-recent"
], function(page) {
  "use strict";

  console.log(page);
  page("/submit", function(ctx, next) {
    console.log("ctx", ctx);
    console.log("ctx", next);
  });

  $("body").on("click", "a[data-href]", function(e) {
    page("/submit");
    e.preventDefault();
  });

});