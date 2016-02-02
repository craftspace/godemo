define([], function() {
  "use strict";

  var init = function(text) {
    console.log("Tag", text);
  };

  return {
    init: init
  };
});