define([], function() {
  "use strict";

  var init = function(text) {
    console.log("User", text);
  };

  return {
    init: init
  };
});