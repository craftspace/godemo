define([
  "page"
], function(page) {
  "use strict";
  // TODO  No elements should be here
  var $body = $("body");

  var routerMap = {
    "/": "home",
    "/user": "user",
    "/tag": "tag",
    "/search": "search-result",
    "/search/:id(.*)": "search-result"
  };

  var setRouter = function(router) {
    page(router, function(ctx) {
      //$body.trigger("destroy." + page.current);
      $body.trigger("destroy");
      require([routerMap[router]], function(module) {
        module && module.init && module.init(ctx.params.id);
      });
    });
  };

  // Setup all the router
  for (var router in routerMap) {
    setRouter(router);
  }
  // Set 404
  page('*', function() {
    console.error('Page not found :(');
  });

  page.maps = routerMap;
  page.start();

  return page;
});