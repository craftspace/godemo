define([
  "page"
], function(page) {
  "use strict";

  var routerMap = {
    "/": "home",
    "/submit": "submit",
    "/detail": "link-detail",
    "/user": "user",
    "/people": "people",
    "/community": "community"
  };

  var setRouter = function(router) {
    page(router, function(ctx) {
      console.log(ctx);
      require([routerMap[router]], function(module) {
        module && module.init && module.init();
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


  var pathname = location.pathname;
  if (routerMap[pathname]) {
    page(pathname);
  } else {
    console.log("404");
    //Redirect to 404
  }

  return page;
});