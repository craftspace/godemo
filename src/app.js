define([
  "page", "router"
], function(page) {
  "use strict";

  //console.log(page);
  //page("/submit", function(ctx, next) {
  //  console.log("ctx", ctx);
  //  console.log("ctx", next);
  //});

  $("body").on("click", "a[data-href]", function(e) {
    var url = e.currentTarget.dataset.href;
    if (url !== "") {
      // TODO BAD SMELL
      $("#home_header").empty();
      $("#home_link_list_container").empty();
      $("#link_list").empty();
      $("#link_list_recent").empty();
      $("#submit_container").empty();
      page(url);
    }
    e.preventDefault();
  });

});